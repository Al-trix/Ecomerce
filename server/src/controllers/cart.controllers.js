import { pool } from '../db.js';
import { generateUID } from '../libs/generateUID.js';

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    const { rows } = await pool.query(
      'SELECT * FROM cart FULL JOIN products ON products.id = cart.product_id FULL JOIN users ON users.id = cart.user_id WHERE cart.user_id = $1',
      [userId]
    );

    console.log(rows);
    const foundCarts = [];

    if (rows.length > 1) {
      rows.forEach((row) => {
        const {
          id,
          product_id,
          quantity,
          status,
          name,
          image_url,
          description,
          price,
          discount_percentage,
        } = row;

        const dataCart = {
          data: {
            id,
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
        };

        foundCarts.push(dataCart);
      });
    } else {
      const {
        id,
        product_id,
        quantity,
        status,
        name,
        image_url,
        description,
        price,
        discount_percentage,
      } = rows[0];

      const dataCart = {
        data: {
          id,
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
      };

      foundCarts.push(dataCart);
    }

    res.status(200).json({
      message: 'Cart found',
      body: {
        carts: foundCarts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createCart = async (req, res) => {
  const { product_id, quantity, status } = req.body;
  const { userId } = req.params;

  try {
    const { rowCount } = await pool.query('SELECT * FROM cart WHERE id = $1', [
      generateUID('cart'),
    ]);

    if (rowCount > 0) {
      res.status(400).json({
        message: 'Cart already exists',
      });
    }

    const { rows } = await pool.query(
      'INSERT INTO cart (id, user_id, product_id, quantity, status)  VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [generateUID('cart'), userId, product_id, quantity, status]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Cart not created',
      });
    }

    res.status(201).json({
      message: 'Cart created successfully',
      body: {
        cart: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = pool.query('DELETE FROM cart WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'Cart and products not found',
      });
    }

    res.status(200).json({
      message: 'Cart and products deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateCart = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const { rows } = pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      message: 'Cart updated successfully',
      body: {
        cart: rows,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//temporal url
export const allCarts = async (req, res) => {
  try {
    const carts = req.body;
    for (const cart of carts) {
      const { userId, productId, quantity } = cart;
      const { rows } = await pool.query(
        'INSERT INTO cart (id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [generateUID('cart'), userId, productId, quantity]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          message: 'Cart not created',
        });
      }
    }

    res.status(201).json({
      message: 'Carts created successfully',
      body: {
        carts: carts,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
