import { pool } from '../db.js';
import { hash, compare } from 'bcryptjs';
import { createToken } from '../libs/createToken.js';


export const registerSeller = async (req, res) => {
  const { id, name, phone, store_name, email, password } = req.body;
  
  const hashPassword = await hash(password, 10);

  try {
    const isUserEmail = await pool.query(
      'SELECT * FROM sellers WHERE email = $1',
      [email]
    );

    if (isUserEmail.rows.length > 0) {
      return res.status(400).json({
        message: 'The email is already in use',
      });
    }

    const query =
      'INSERT INTO sellers (id, name, email, password, phone, store_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const { rows } = await pool.query(query, [
      id,
      name,
      email,
      password,
      phone,
      store_name,
    ]);
    
    createToken(rows[0], 'access_token', 'seller' , '1h');
    res.status(202).json({
      message: 'User created successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rowCount, rows } = await pool.query(
      'SELECT * FROM sellers WHERE email = $1 ',
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
    
    createToken(rows[0], 'access_token', 'seller' , '1h');
    res.status(200).json({
      message: 'Login successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const deleteSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM sellers WHERE id = $1', [
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
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const updatedSeller = async (req, res) => {
  const { id } = req.params;
  const { name, phone, store_name, email, password } = req.body;

  const query = `
    UPDATE sellers 
    SET 
      name = COALESCE(NULLIF($1, ''), name), 
      email = COALESCE(NULLIF($2, ''), email), 
      phone = COALESCE(NULLIF($3, ''), phone),
      store_name = COALESCE(NULLIF($4, ''), store_name) 
      WHERE id = $5 RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, [
      name,
      email,
      phone,
      store_name,
      id,
    ]);

    res.status(200).json({
      message: 'User updated successfully',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const createAllSellers = async (req, res) => {
  const usersNews = req.body;

  for (const { id, name, phone, store_name, email, password } of usersNews) {
    const query = `INSERT INTO sellers (id, name, phone, store_name, email, password) VALUES ($1, $2, $3, $4, $5, $6)`;

    await pool.query(query, [id, name, phone, store_name, email, password]);
  }

  const query = `SELECT * FROM sellers`;

  res.status(200).json({
    message: 'Sellers created successfully',
    body: {
      sellers: query.rows,
    },
  });
};
