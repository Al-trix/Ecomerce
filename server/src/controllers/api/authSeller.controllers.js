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
        error: {
          store_name: 'El nombre de la tienda ya está registrado',
          typeError: 'DATE_DUPLICATE',
        },
      });
    }

    if (isUserPhone.rows.length > 0) {
      return res.status(400).json({
        error: {
          phone: 'El teléfono ya está registrado',
          typeError: 'DATE_DUPLICATE',
        },
      });
    }

    if (isUserEmail.rows.length > 0) {
      return res.status(400).json({
        error: {
          email: 'El correo ya está registrado',
          typeError: 'DATE_DUPLICATE',
        },
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
        user: {
          id: seller[0].id,
          name: seller[0].name,
          email: seller[0].email,
          phone: seller[0].phone,
          store_name: seller[0].store_name,
          avatar: seller[0].avatar,
          city: seller[0].city,
        },
        products: [],
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error creating seller',
        typeError: 'DATE_NOT_FOUND',
      },
    });
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
        error: {
          email: 'El correo no está registrado',
          typeError: 'USER_NOT_FOUND',
        },
      });
    }

    const isMatch = await compare(password, seller[0].password);

    if (!isMatch) {
      return res.status(401).json({
        error: {
          password: 'La contraseña es incorrecta',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const productsCreate = await searchInfoProducts(seller[0].id);

    createToken({ id: seller[0].id }, 'seller', 'access_token', res);
    res.status(200).json({
      message: 'Se ha iniciado sesión correctamente',
      body: {
        user: {
          id: seller[0].id,
          name: seller[0].name,
          email: seller[0].email,
          phone: seller[0].phone,
          store_name: seller[0].store_name,
          avatar: seller[0].avatar,
          city: seller[0].city,
        },
        products: productsCreate,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error logging in',
        typeError: 'DATE_NOT_FOUND',
      },
    });
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
        error: {
          message: 'Usuario no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    res.status(200).json({
      data: {
        message: 'Usuario eliminado correctamente',
      },
    });
  } catch (err) {
    res.status(500).json({
        error: {
          message: 'Error deleting seller',
          typeError: 'DATE_NOT_FOUND',
        },
    });
    console.log(err);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie('access_token');

    res.status(200).json({
      data: {
        message: 'Se ha cerrado sesión correctamente',
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        error: {
          message: 'Error logging out',
          typeError: 'DATE_NOT_FOUND',
        },
      },
    });
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
          user: {
            name: rows[0].name,
            email: rows[0].email,
            phone: rows[0].phone,
            store_name: rows[0].store_name,
            avatar: rows[0].avatar,
            city: rows[0].city,
          },
          products: rows[0].products,
        },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error updating seller',
        typeError: 'DATE_NOT_FOUND',
      },
    });
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
        error: {
          message: 'Usuario no encontrado',
          typeError: 'DATE_NOT_FOUND',
        },
      });
    }

    const productsCreate = await searchInfoProducts(seller[0].id);

    res.status(200).json({
        message: 'Usuario encontrado',
        body: {
          user: {
            name: seller[0].name,
            email: seller[0].email,
            phone: seller[0].phone,
            store_name: seller[0].store_name,
            avatar: seller[0].avatar,
            city: seller[0].city,
          },
          products: productsCreate,
        },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error validating token',
        typeError: 'DATE_NOT_FOUND',
      },
    });
    console.log(err);
  }
};
