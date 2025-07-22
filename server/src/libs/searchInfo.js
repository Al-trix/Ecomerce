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
  const limit = Math.min(parseInt(queryLimit) || 10, 100); // Limit max to 100
  const offset = (page - 1) * limit;

  const conditionsFilters = [];
  const valuesFilters = [];
  let paramCounter = 1;

  // Dynamic filters with better validation
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

  // Add price range filters
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

  // Add sorting options
  const validSortFields = [
    'name',
    'price',
    'rating',
    'created_at',
    'discount_percentage',
  ];
  const validSortOrders = ['asc', 'desc'];
  let orderBy = 'p.created_at DESC'; // default

  if (filters.sort_by && validSortFields.includes(filters.sort_by)) {
    const sortOrder = validSortOrders.includes(
      filters.sort_order?.toLowerCase()
    )
      ? filters.sort_order.toUpperCase()
      : 'DESC';
    orderBy = `p.${filters.sort_by} ${sortOrder}`;
  }

  // Add limit and offset at the end
  valuesFilters.push(limit, offset);

  console.log('Filters:', conditionsFilters, 'Values:', valuesFilters);

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
      ORDER BY p.created_at DESC`,

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
      LIMIT $${paramCounter++}
      OFFSET $${paramCounter++}`,

    // Get total count for pagination
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
      LIMIT 10`, // Limit reviews to avoid too much data

    // Optimized query to get all reviews at once
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
      const { rows } = await pool.query(querys.queryProductsById, [id]);
      products = rows;
    } else {
      const countValues = valuesFilters.slice(0, -2); // Remove limit and offset for count

      const [productsResult, countResult] = await Promise.all([
        pool.query(querys.queryProducts, valuesFilters),
        pool.query(querys.queryProductsCount, countValues),
      ]);

      products = productsResult.rows;
      totalCount = parseInt(countResult.rows[0].total);
    }

    if (products.length === 0) {
      return {
        typeError: 'DATE_NOT_FOUND',
      };
    }

    const foundInfo = [];
    const productIds = products.map((p) => p.product_id);

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

    // Return with pagination info
    if (id) {
      return foundInfo;
    } else {
      return {
        data: foundInfo,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNext: page < Math.ceil(totalCount / limit),
          hasPrev: page > 1,
        },
      };
    }
  } catch (er) {
    console.error('Error en la consulta de productos:', er);
    return {
      error: 'Error al buscar los productos',
      typeError: 'DATABASE_ERROR',
    };
  }
};
