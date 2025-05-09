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

export const searchInfoProducts = async (id, query = {}) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  const querys = {
    queryProductsById: `
    SELECT * 
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
    s.rating AS seller_rating,
    s.phone,
    p.description,
    p.stock,
    p.price,
    p.discount_percentage,
    p.image_url,
    p.category
    FROM products p
    INNER JOIN sellers s ON p.seller_id = s.id 
    ORDER BY p.created_at DESC
    LIMIT $1 
    OFFSET $2
    `,

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
    ORDER BY r.created_at DESC`,
  };
  try {
    const { rows: products } = await pool.query(
      id ? querys.queryProductsById : querys.queryProducts,
      id ? [id] : [limit, offset]
    );

    if (products.length === 0) {
      return {
        message: 'No se encontraron productos',
      };
    }

    const foundInfo = [];

    if (products.length > 0) {
      for (const product of products) {
        const { rows: reviews } = await pool.query(
          querys.queryReviewsProducts,
          [product.product_id]
        );

        const infoProduct = id
          ? {
              product: {
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
              },
              reviews: reviews.map((review) => ({
                id: review.review_id,
                user_id: review.user_id,
                rating: review.rating,
                comment: review.comment,
                nameUser: review.name,
                avatar: review.avatar,
                created_at: review.review_created_at,
              })),
            }
          : {
              product: {
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
              },
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
              reviews: reviews.map((review) => ({
                id: review.review_id,
                user_id: review.user_id,
                rating: review.rating,
                comment: review.comment,
                nameUser: review.name,
                avatar: review.avatar,
                created_at: review.review_created_at,
              })),
            };
        foundInfo.push(infoProduct);
      }
    }

    return foundInfo;
  } catch (er) {
    console.error('Error en la consulta de productos:', er);
    return {
      error: 'Error al buscar los productos',
    };
  }
};
