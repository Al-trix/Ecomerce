import { pool } from '../../db.js';
import { hash, compare } from 'bcryptjs';
import { createToken } from '../../libs/createToken.js';
import generateUID from '../../libs/generateUID.js';
import { searchInfoCarts, searchInfoOrders } from '../../libs/searchInfo.js';

export const register = async (req, res) => {
  const { name, phone, email, password, address, avatar, city } = req.body;
  try {
    const isUserEmail = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const isUserPhone = await pool.query(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );

    if (isUserPhone.rows.length > 0) {
      return res.status(400).json({
        error: {
          phone: 'El teléfono ya está registrado',
        },
      });
    }

    if (isUserEmail.rows.length > 0) {
      return res.status(400).json({
        error: {
          email: 'El correo ya está registrado',
        },
      });
    }

    const hashPassword = await hash(password, 10);

    const query =
      'INSERT INTO users (id, email, password, address, phone, name, avatar, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const { rows: user } = await pool.query(query, [
      generateUID(),
      email,
      hashPassword,
      address,
      phone,
      name,
      avatar,
      city,
    ]);

    createToken({ id: user[0].id }, 'user', 'access_token', res);

    res.status(200).json({
      message: 'Usuario registrado correctamente',
      body: {
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          address: user[0].address,
          avatar: user[0].avatar,
          city: user[0].city,
        },
        carts: [],
        orders: [],
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rowCount, rows: loginUser } = await pool.query(
      'SELECT * FROM users WHERE email = $1 ',
      [email]
    );

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          email: 'El correo no está registrado',
        },
      });
    }

    const isMatch = await compare(password, loginUser[0].password);
    if (!isMatch) {
      return res.status(401).json({
        error: {
          password: 'Credenciales inválidas',
        },
      });
    }

    const carts = await searchInfoCarts(loginUser[0].id);
    const orders = await searchInfoOrders(loginUser[0].id);

    createToken({ id: loginUser[0].id }, 'user', 'access_token', res);

    res.status(200).json({
      message: 'Se ha iniciado sesión correctamente',
      body: {
        user: {
          id: loginUser[0].id,
          name: loginUser[0].name,
          email: loginUser[0].email,
          phone: loginUser[0].phone,
          address: loginUser[0].address,
          avatar: loginUser[0].avatar,
          city: loginUser[0].city,
        },
        carts,
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
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
        error: {
          message: 'Usuario no encontrado',
        },
      });
    }

    res.status(200).json({
      message: 'Usuario eliminado correctamente',
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
  }
};

export const editAcount = async (req, res) => {
  const { id } = req.params;
  const {
    name = '',
    phone = '',
    address = '',
    email = '',
    avatar = '',
    city = '',
  } = req.body;

  try {
    const query = `
      UPDATE users 
      SET 
        name = COALESCE(NULLIF($1, ''), name), 
        email = COALESCE(NULLIF($2, ''), email), 
        phone = COALESCE(NULLIF($3, ''), phone),
        address = COALESCE(NULLIF($4, ''), address),
        avatar = COALESCE(NULLIF($5, ''), avatar),
        city = COALESCE(NULLIF($6, ''), city)
        WHERE id = $5 RETURNING *;
    `;
    const { rowCount, rows: user } = await pool.query(query, [
      name,
      email,
      phone,
      address,
      id,
      avatar,
      city,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
        },
      });
    }

    res.status(200).json({
      message: 'Usuario editado correctamente',
      body: {
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          address: user[0].address,
          avatar: user[0].avatar,
          city: user[0].city,
        },
        carts: [],
        orders: [],
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({
      message: 'Cierre de sesión exitoso',
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
  }
};

export const validateInfoToken = async (req, res) => {
  const { id } = req.user;

  try {
    const { rows: user } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
        },
      });
    }

    const carts = await searchInfoCarts(user[0].id);
    const orders = await searchInfoOrders(user[0].id);

    res.status(200).json({
      message: 'Usuario encontrado',
      body: {
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          phone: user[0].phone,
          address: user[0].address,
          avatar: user[0].avatar,
          city: user[0].city,
        },
        carts,
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'error interno del servidor',
      },
    });
    console.log(err);
  }
};
