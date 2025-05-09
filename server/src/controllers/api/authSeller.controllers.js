import { pool } from '../../db.js';
import { hash, compare } from 'bcryptjs';
import { createToken } from '../../libs/createToken.js';

import { searchInfoProducts } from '../../libs/searchInfo.js';
import generateUID from '../../libs/generateUID.js';

export const registerSeller = async (req, res) => {
  const { name, phone, store_name, email, password, avatar, city } = req.body;

  const hashPassword = await hash(password, 10);

  try {
    const isUserEmail = await pool.query(
      'SELECT * FROM sellers WHERE email = $1',
      [email]
    );

    const isUserPhone = await pool.query(
      'SELECT * FROM sellers WHERE phone = $1',
      [phone]
    );

    const isUserStoreName = await pool.query(
      'SELECT * FROM sellers WHERE store_name = $1',
      [store_name]
    );

    if (isUserStoreName.rows.length > 0) {
      return res.status(400).json({
        message: 'El nombre de la tienda ya está registrado',
      });
    }

    if (isUserPhone.rows.length > 0) {
      return res.status(400).json({
        message: 'El teléfono ya está registrado',
      });
    }

    if (isUserEmail.rows.length > 0) {
      return res.status(400).json({
        message: 'El correo ya está registrado',
      });
    }

    const query =
      'INSERT INTO sellers (id, name, email, password, phone, store_name, avatar, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const { rows: seller } = await pool.query(query, [
      generateUID(),
      name,
      email,
      password,
      phone,
      store_name,
      avatar,
      city,
    ]);

    createToken({ id: seller[0].id }, 'seller', 'access_token', res);

    res.status(202).json({
      message: 'Usuario creado correctamente',
      body: {
        user: seller[0],
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
    const { rowCount, rows: seller } = await pool.query(
      'SELECT * FROM sellers WHERE email = $1 ',
      [email]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        message: 'El correo no está registrado',
      });
    }

    const isMatch = await compare(password, seller[0].password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Your password is incorrect',
      });
    }

    const productsCreate = await searchInfoProducts(seller[0].id);

    createToken({ id: seller[0].id }, 'seller', 'access_token', res);
    res.status(200).json({
      message: 'Se ha iniciado sesión correctamente',
      body: {
        user: seller[0],
        products: productsCreate,
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
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      message: 'Usuario eliminado correctamente',
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie('access_token');

    res.status(200).json({
      message: 'Se ha cerrado sesión correctamente',
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const updatedSeller = async (req, res) => {
  const { id } = req.params;
  const { name, phone, store_name, email, avatar, city } = req.body;

  const query = `
    UPDATE sellers 
    SET 
      name = COALESCE(NULLIF($1, ''), name), 
      email = COALESCE(NULLIF($2, ''), email), 
      phone = COALESCE(NULLIF($3, ''), phone),
      store_name = COALESCE(NULLIF($4, ''), store_name) ,
      avatar = COALESCE(NULLIF($5, ''), avatar),
      city = COALESCE(NULLIF($6, ''), city)
      WHERE id = $5 RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, [
      name,
      email,
      phone,
      store_name,
      id,
      avatar,
      city,
    ]);

    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      body: {
        user: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

export const validateInfoTokenSeller = async (req, res) => {
  const { id } = req.userSeller;

  try {
    const { rows: seller } = await pool.query(
      'SELECT * FROM sellers WHERE id = $1',
      [id]
    );

    if (seller.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    const productsCreate = await searchInfoProducts(seller[0].id);

    res.status(200).json({
      message: 'Usuario encontrado',
      body: {
        user: user[0],
        products: productsCreate,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};
