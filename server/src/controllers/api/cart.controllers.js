import { pool } from '../../db.js';
import generateUID from '../../libs/generateUID.js';
import { searchInfoCarts } from '../../libs/searchInfo.js';

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Carrito no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const foundCarts = await searchInfoCarts(userId);

    res.status(200).json({
      message: 'Carrito encontrado',
      body: {
        carts: foundCarts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error getting cart',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const createCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const { userId } = req.params;

  try {
    const { rowCount } = await pool.query(
      'SELECT * FROM cart WHERE product_id = $1',
      [product_id]
    );

    if (rowCount > 0) {
      return res.status(409).json({
        error: {
          message: 'El producto ya existe en el carrito',
          typeError: 'DATE_DUPLICATE',
          },
      });
    }

    const { rows } = await pool.query(
      'INSERT INTO cart (id, user_id, product_id, quantity)  VALUES ($1, $2, $3, $4) RETURNING id;',
      [generateUID('cart'), userId, product_id, quantity]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: {
          message: 'Carrito no creado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const foundCart = await searchInfoCarts(userId);

    res.status(201).json({
      message: 'Carrito creado correctamente',
      body: {
        carts: foundCart,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error creating cart',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = pool.query('DELETE FROM cart WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Carrito no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    res.status(200).json({
      message: 'Carrito eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error deleting cart',
        typeError: 'DATE_NOT_FOUND',
      },
    });
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
        error: {
          message: 'Carrito no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    res.status(200).json({
      message: 'Carrito actualizado correctamente',
      body: {
        cart: rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: 'Error updating cart',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

