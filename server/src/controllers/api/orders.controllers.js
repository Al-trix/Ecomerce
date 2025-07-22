import { pool } from '../../db.js';
import { searchInfoCarts, searchInfoOrders } from '../../libs/searchInfo.js';
import generateUID from '../../libs/generateUID.js';

export const getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await searchInfoOrders(userId);

    return res.status(200).json({
      message: 'Ordenes encontradas',
      body: {
        orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching orders',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'No tienes productos en el carrito',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const { rows: total } = await pool.query(
      'SELECT SUM(cart.quantity * products.price) AS total_price FROM cart INNER JOIN products ON cart.product_id = products.id'
    );

    if (status === 'completed') {
      const query = 'DELETE FROM cart WHERE user_id = $1';
      await pool.query(query, [userId]);
    }

    const { rows: order } = await pool.query(
      'INSERT INTO orders (id, user_id, total_price ,status) VALUES ($1, $2, $3, $4) RETURNING *',
      [generateUID('order'), userId, total[0].total_price, status]
    );

    if (order.length === 0) {
      return res.status(404).json({
        error: {
          message: 'la orden no fue creada',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const infoCarts = await searchInfoCarts(order[0].user_id);

    const foundOrders = [];
    for (const cart of infoCarts) {
      const { quantity } = cart.dataCart;
      const {
        id: product_id,
        name,
        image_url,
        price,
        description,
        discount_percentage,
      } = cart.product;

      const subtotal = (price - (price * discount_percentage) / 100) * quantity;

      const { rows: items } = await pool.query(
        'INSERT INTO orders_items (id, order_id, product_id, quantity, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [generateUID('order_item'), order[0].id, product_id, quantity, subtotal]
      );

      foundOrders.push({
        ordersIT: {
          orderItemId: items[0].id,
          subtotal,
        },
        product: {
          id: product_id,
          name,
          image_url,
          description,
          discount_percentage,
          price,
          quantity,
        },
      });
    }

    return res.status(201).json({
      message: 'Orden creada',
      body: { order: order[0], orderItems: foundOrders },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error creating order',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'No tienes ordenes registradas',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    await pool.query('DELETE FROM orders WHERE id = $1', [id]);

    return res.status(200).json({
      data: {
        message: 'Orden eliminada',
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        error: {
          message: 'Error deleting order',
          typeError: 'DATE_NOT_FOUND',
        },
    });
  }
};

export const editOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'No tienes ordenes registradas',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const { rows } = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: {
          message: 'la orden no fue editada',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    return res.status(200).json({
      message: 'Orden editada',
      order: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error editing order',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};
