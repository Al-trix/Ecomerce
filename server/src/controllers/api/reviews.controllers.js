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

    console.log(userId, product_id, rating, comment);

    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    const { rows: review } = await pool.query(
      'INSERT INTO reviews (id, user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [generateUID('review'), userId, product_id, rating, comment]
    );

    if (!review) {
      return res.status(404).json({ message: 'reseña no creada' });
    }

    return res.status(201).json({
      message: 'reseña creada',
      review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'error interno del servidor',
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
      return res.status(404).json({ message: 'reseña no encontrada' });
    }

    return res.status(200).json({
      message: 'reseña actualizada',
      review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'error interno del servidor',
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
      return res.status(404).json({ message: 'reseña no encontrada' });
    }

    return res.status(200).json({
      message: 'reseña eliminada',
      review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'error interno del servidor',
    });
  }
};
