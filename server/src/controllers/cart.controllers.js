import { pool } from '../db';

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      message: 'Cart found',
      body: {
        cart: rows,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createCart = async (req, res) => {
  const { id, productId, quantity } = req.body;
  const { userId } = req.params;

  try {
    const { rowCount } = await pool.query('SELECT * FROM cart WHERE id = $1', [
      id,
    ]);

    if (rowCount > 0) {
      res.status(400).json({
        message: 'Cart already exists',
      });
    }

    const { rows } = await pool.query(
      'INSERT INTO (id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, userId, productId, quantity]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Cart not created',
      });
    }

    res.status(201).json({
      message: 'Cart created successfully',
      body: {
        cart: rows,
      },
    });
  } catch (error) {
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
} 

export const updateCart = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const { rows } = pool.query('UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *', [
      quantity,
      id,
    ]);

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
}