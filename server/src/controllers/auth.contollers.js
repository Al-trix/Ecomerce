import { pool } from '../db.js';
import { hash, compare } from 'bcryptjs';

export const register = async (req, res) => {
  const { id, name, phone, address, email, password } = req.body;
  const hashPassword = await hash(password, 10);

  try {
    const isUserEmail = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (isUserEmail.rows.length > 0) {
      return res.status(400).json({
        message: 'The email is already in use',
      });
    }

    const query =
      'INSERT INTO users (id, email, password, address, phone, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const { rows } = await pool.query(query, [
      id,
      email,
      hashPassword,
      address,
      phone,
      name,
    ]);
    console.log(rows);

    res.status(202).json({
      message: 'User created successfully',
      body: {
        user: { rows },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const { rowCount, rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1 ',
      [email]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'The email is not registered',
      });
    }

    const isMatch = await compare(password, rows[0].password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Your password is incorrect',
      });
    }

    res.status(200).json({
      message: 'Login successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
};

export const deleteAcount = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [
      id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
};

export const editAcount = async (req, res) => {
  const { id } = req.params;
  const {
    name = '',
    phone = '',
    address = '',
    email = '',
    password = '',
  } = req.body;

  const query = `
    UPDATE users 
    SET 
      name = COALESCE(NULLIF($1, ''), name), 
      email = COALESCE(NULLIF($2, ''), email), 
      phone = COALESCE(NULLIF($3, ''), phone),
      address = COALESCE(NULLIF($4, ''), address) 
      WHERE id = $5 RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, [name, email, phone, address, id]);

    res.status(200).json({
      message: 'User updated successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.response.data });
  }
};
