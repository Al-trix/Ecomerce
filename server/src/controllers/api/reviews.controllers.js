import { pool } from '../../db.js';
import generateUID from '../../libs/generateUID.js';

export const createReview = async (req, res) => {
  const { userId } = req.params;
  const { product_id, rating, comment } = req.body;
  try {
    const { rows: user } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const { rows: review } = await pool.query(
      'INSERT INTO reviews (id, user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [generateUID('review'), userId, product_id, rating, comment]
    );

    if (!review) {
      return res.status(404).json({
        error: {
          message: 'Reseña no creada',
          typeError: 'DATE_NOT_CREATED',
        },
      });
    }

    return res.status(201).json({
      message: 'Reseña creada',
      body: review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: 'Error creating review',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const { rows: review } = await pool.query(
      'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
      [rating, comment, id]
    );

    if (!review) {
      return res.status(404).json({
        error: {
          message: 'Reseña no encontrada',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    return res.status(202).json({
      message: 'reseña actualizada',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: 'Error updating review',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: review } = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [id]
    );

    if (!review) {
      return res.status(404).json({
        error: {
          message: 'Reseña no encontrada',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    return res.status(201).json({
      message: 'reseña eliminada'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: 'Error deleting review',
        typeError: 'DATE_NOT_FOUND',
      },
    });
  }
};
