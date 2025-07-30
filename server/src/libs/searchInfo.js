import { decodeBase64 } from 'bcryptjs';
import { pool } from '../db.js';

export const searchInfoCarts = async (id) => {
  const query = `
  SELECT
  u.id AS user_id,
  p.id AS product_id, 
  c.id AS cart_id, 

  c.quantity,
  c.status,
  p.name,
  p.image_url,
  p.description,
  p.price,
  p.discount_percentage

  FROM cart AS c
  INNER JOIN products AS p ON c.product_id = p.id 
  INNER JOIN users AS u ON c.user_id = u.id 
  WHERE u.id = $1
  
  `;
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) {
    return {
      message: 'No tienes productos en el carrito',
      typeError: 'DATE_NOT_FOUND',
    };
  }

  const foundInfo = [];

  if (rows.length > 0) {
    rows.map((info) => {
      const {
        cart_id,
        product_id,
        quantity,
        status,
        name,
        image_url,
        description,
        price,
        discount_percentage,
      } = info;

      foundInfo.push({
        dataCart: {
          cart_id,
          quantity,
          status,
        },
        product: {
          id: product_id,
          name,
          image_url,
          description,
          price,
          discount_percentage,
        },
      });
    });
  }

  return foundInfo;
};

export const searchInfoOrders = async (id) => {
  const query = `
  SELECT 
  u.id AS user_id,
  o.id AS order_id,
  oi.id AS order_item_id,
  oi.quantity,
  oi.subtotal,
  p.id AS product_id,
  p.name,
  p.image_url,
  p.description,
  p.discount_percentage,
  p.price,
  o.status,
  o.total_price,
  o.created_at


  FROM orders o
  INNER JOIN orders_items oi ON o.id = oi.order_id
  INNER JOIN products p ON oi.product_id = p.id
  INNER JOIN users u ON o.user_id = u.id
  WHERE u.id = $1;
`;

  try {
    const { rows } = await pool.query(query, [id]);
    const orders = {};

    if (rows.length === 0) {
      return {
        message: 'No tienes ordenes',
      };
    }

    rows.forEach((order) => {
      if (!orders[order?.order_id]) {
        orders[order?.order_id] = {
          orderId: order?.order_id,
          total_price: order?.total_price,
          status: order?.status,
          created_at: order?.created_at,
          items: [],
        };
      }

      orders[order?.order_id].items.push({
        itemId: order?.order_item_id,
        subtotal: order?.subtotal,
        product: {
          id: order?.product_id,
          name: order?.name,
          image_url: order?.image_url,
          description: order?.description,
          discount_percentage: order?.discount_percentage,
          price: order?.price,
          quantity: order?.quantity,
        },
      });
    });

    return Object.values(orders);
  } catch (err) {
    console.error('Error en la consulta de ordenes:', err);
    return {
      error: 'Error al buscar las ordenes',
    };
  }
};

export const searchInfoProducts = async (id = null, queryParamsInput = {}) => {
  const { page: queryPage, limit: queryLimit, ...filters } = queryParamsInput;

  const page = parseInt(queryPage) || 1;
  const limit = Math.min(parseInt(queryLimit) || 10, 100);
  const offset = (page - 1) * limit;

  const conditionsFilters = [];
  const valuesFilters = [];
  let paramCounter = 1;

  // Procesar filtros dinámicos
  if (filters.category && filters.category.trim()) {
    conditionsFilters.push(`p.category = $${paramCounter++}`);
    valuesFilters.push(filters.category.trim());
  }

  if (filters.name && filters.name.trim()) {
    conditionsFilters.push(`p.name ILIKE $${paramCounter++}`);
    valuesFilters.push(`%${filters.name.trim()}%`);
  }

  if (filters.price && !isNaN(parseFloat(filters.price))) {
    const price = parseFloat(filters.price);
    if (price >= 0) {
      conditionsFilters.push(`p.price = $${paramCounter++}`);
      valuesFilters.push(price);
    }
  }

  if (filters.rating && !isNaN(parseFloat(filters.rating))) {
    const rating = parseFloat(filters.rating);
    if (rating >= 0 && rating <= 5) {
      conditionsFilters.push(`p.rating = $${paramCounter++}`);
      valuesFilters.push(rating);
    }
  }

  if (
    filters.discount_percentage &&
    !isNaN(parseFloat(filters.discount_percentage))
  ) {
    const discount = parseFloat(filters.discount_percentage);
    if (discount >= 0 && discount <= 100) {
      conditionsFilters.push(`p.discount_percentage = $${paramCounter++}`);
      valuesFilters.push(discount);
    }
  }

  if (filters.stock && !isNaN(parseInt(filters.stock))) {
    const stock = parseInt(filters.stock);
    if (stock >= 0) {
      conditionsFilters.push(`p.stock = $${paramCounter++}`);
      valuesFilters.push(stock);
    }
  }

  if (filters.min_price && !isNaN(parseFloat(filters.min_price))) {
    const minPrice = parseFloat(filters.min_price);
    if (minPrice >= 0) {
      conditionsFilters.push(`p.price >= $${paramCounter++}`);
      valuesFilters.push(minPrice);
    }
  }

  if (filters.max_price && !isNaN(parseFloat(filters.max_price))) {
    const maxPrice = parseFloat(filters.max_price);
    if (maxPrice >= 0) {
      conditionsFilters.push(`p.price <= $${paramCounter++}`);
      valuesFilters.push(maxPrice);
    }
  }

  // Configurar ordenamiento
  const validSortFields = [
    'name',
    'price',
    'rating',
    'created_at',
    'discount_percentage',
  ];
  const validSortOrders = ['asc', 'desc'];
  let orderBy = 'p.created_at DESC';

  if (filters.sort_by && validSortFields.includes(filters.sort_by)) {
    const sortOrder = validSortOrders.includes(
      filters.sort_order?.toLowerCase()
    )
      ? filters.sort_order.toUpperCase()
      : 'DESC';
    orderBy = `p.${filters.sort_by} ${sortOrder}`;
  }

  // 🔥 CLAVE: Siempre agregar limit y offset después de todos los filtros
  valuesFilters.push(limit, offset);


  const querys = {
    queryProductsById: `
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.rating AS product_rating,
        p.created_at AS product_created_at,
        p.description,
        p.stock,
        p.price,
        p.discount_percentage,
        p.image_url,
        p.category
      FROM products AS p
      WHERE p.seller_id = $1
      ORDER BY p.created_at DESC
      LIMIT $2
      OFFSET $3`,

    queryProducts: `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.rating AS product_rating,
        p.created_at AS product_created_at,
        s.id AS product_seller_id,
        s.rating AS seller_rating,
        s.name AS seller_name,
        s.created_at AS seller_created_at,
        s.avatar,
        s.city,
        s.store_name,
        s.phone,
        p.description,
        p.stock,
        p.price,
        p.discount_percentage,
        p.image_url,
        p.category
      FROM products p
      INNER JOIN sellers s ON p.seller_id = s.id  
      ${
        conditionsFilters.length > 0
          ? 'WHERE ' + conditionsFilters.join(' AND ')
          : ''
      }
      ORDER BY ${orderBy}
      LIMIT $${paramCounter}
      OFFSET $${paramCounter + 1}`,

    queryProductsCount: `
      SELECT COUNT(*) as total
      FROM products p
      INNER JOIN sellers s ON p.seller_id = s.id  
      ${
        conditionsFilters.length > 0
          ? 'WHERE ' + conditionsFilters.join(' AND ')
          : ''
      }`,

    queryReviewsProducts: `
      SELECT
        r.id AS review_id,
        r.created_at AS review_created_at,
        r.user_id,
        r.rating,
        r.comment,
        u.name,
        u.avatar
      FROM reviews AS r
      INNER JOIN users AS u ON r.user_id = u.id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
      LIMIT 10`,

    queryAllReviews: `
      SELECT
        r.id AS review_id,
        r.product_id,
        r.created_at AS review_created_at,
        r.user_id,
        r.rating,
        r.comment,
        u.name,
        u.avatar
      FROM reviews AS r
      INNER JOIN users AS u ON r.user_id = u.id
      WHERE r.product_id = ANY($1)
      ORDER BY r.created_at DESC`,
  };

  try {
    let products,
      totalCount = 0;

    if (id) {
      // Para consulta por ID, también aplicamos paginación
      const { rows } = await pool.query(querys.queryProductsById, [
        id,
        limit,
        offset,
      ]);
      products = rows;

      // Para el count cuando es por ID, es más simple
      const { rows: countRows } = await pool.query(
        'SELECT COUNT(*) as total FROM products WHERE seller_id = $1',
        [id]
      );
      totalCount = parseInt(countRows[0].total);
    } else {
      // Para consulta general
      const countValues = valuesFilters.slice(0, -2); // Remover limit y offset para el count

      const [productsResult, countResult] = await Promise.all([
        pool.query(querys.queryProducts, valuesFilters),
        pool.query(querys.queryProductsCount, countValues),
      ]);

      products = productsResult.rows;
      totalCount = parseInt(countResult.rows[0].total);
    }

    if (products.length === 0) {
      // Aún devolver estructura de paginación aunque no haya resultados
      return {
        typeError: 'DATE_NOT_FOUND',
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: page > 1,
        },
      };
    }

    const foundInfo = [];
    const productIds = products.map((p) => p.product_id);

    // Obtener reviews optimizado
    let reviewsMap = {};
    if (productIds.length > 0) {
      const { rows: allReviews } = await pool.query(
        id ? querys.queryReviewsProducts : querys.queryAllReviews,
        id ? [productIds[0]] : [productIds]
      );

      reviewsMap = allReviews.reduce((acc, review) => {
        const productId = review.product_id;
        if (!acc[productId]) {
          acc[productId] = [];
        }
        acc[productId].push({
          id: review.review_id,
          user_id: review.user_id,
          rating: review.rating,
          comment: review.comment,
          nameUser: review.name,
          avatar: review.avatar,
          created_at: review.review_created_at,
        });
        return acc;
      }, {});
    }

    // Construir respuesta
    for (const product of products) {
      const productInfo = {
        id: product.product_id,
        name: product.product_name,
        rating: product.product_rating,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        stock: product.stock,
        category: product.category,
        discount_percentage: product.discount_percentage,
        created_at: product.product_created_at,
      };

      const reviewsInfo = reviewsMap[product.product_id] || [];

      const infoProduct = id
        ? {
            product: productInfo,
            reviews: reviewsInfo,
          }
        : {
            product: productInfo,
            seller: {
              id: product.product_seller_id,
              name: product.seller_name,
              rating: product.seller_rating,
              avatar: product.avatar,
              city: product.city,
              store_name: product.store_name,
              phone: product.phone,
              created_at: product.seller_created_at,
            },
            reviews: reviewsInfo,
          };

      foundInfo.push(infoProduct);
    }

    // 🎯 SIEMPRE devolver con información de paginación
    const paginationInfo = {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNext: page < Math.ceil(totalCount / limit),
      hasPrev: page > 1,
    };

    return {
      data: foundInfo,
      pagination: paginationInfo,
    };
  } catch (er) {
    console.error('Error en la consulta de productos:', er);
    return {
      error: 'Error al buscar los productos',
      typeError: 'DATABASE_ERROR',
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: page > 1,
      },
    };
  }
};

// 🎯 Controller actualizado para manejar la nueva estructura
export const getProducts = async (req, res) => {
  const queryParamsInput = req.query;

  try {
    const result = await searchInfoProducts(null, queryParamsInput);

    if (result.typeError === 'DATE_NOT_FOUND') {
      return res.status(404).json({
        error: {
          message: 'No se encontraron productos',
          typeError: 'DATE_NOT_FOUND',
        },
        pagination: result.pagination, // Incluir paginación aunque no haya datos
      });
    }

    if (result.typeError === 'DATABASE_ERROR') {
      return res.status(500).json({
        error: {
          message: 'Error en la base de datos',
          typeError: 'DATABASE_ERROR',
        },
        pagination: result.pagination,
      });
    }

    // ✅ Respuesta exitosa siempre con paginación
    res.status(200).json({
      message: 'Lista de productos',
      body: {
        products: result.data,
        ...result.pagination, // Spread de toda la info de paginación
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error interno del servidor',
        typeError: 'SERVER_ERROR',
      },
      pagination: {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, 100),
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    });
  }
};