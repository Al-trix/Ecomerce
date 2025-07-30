import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { pool } from '../db.js';

//! Middleware para verificar el token de los usuarios
//? Verifica si el token es valido y si el usuario tiene el rol de user
//? Si el token es valido se le pasa el id del usuario al siguiente middleware
//? Si el token no es valido se le manda un error al cliente
//? Si el token no existe se le manda un error al cliente
export const checkAuthorizade = (typeUser) => (req, res, next) => {
  const { access_token } = req.cookies;
  
  try {
    if (typeUser === 'user' && !req.user && !access_token) {
      return res.status(401).json({
        message: 'No se encontró el token del usuario',
      });
    }

    if (typeUser === 'seller' && !req.userSeller && !access_token) {
      return res.status(401).json({
        message: 'No se encontró el token del vendedor',
      });
    }

    if (access_token.role === 'user' && typeUser === 'user') {
      const token = access_token?.data;
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.user = decoded;
      next();
      return;
    }

    console.log(access_token.role, typeUser);

    if (access_token.role === 'seller' && typeUser === 'seller') {
      const token = access_token?.data;
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.userSeller = decoded;
      console.log(req.userSeller);
      console.log(decoded);
      next();
      return;
    }
    return res.status(403).json({
      message: 'Token invalido',
      typeError: 'TOKEN_INVALID',
    });
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({
      message: 'Error verifying token',
      typeError: 'TOKEN_INVALID',
    });
  }
};

export const checkAuthorizadeSocket = (io) => {
  io.use(async (socket, next) => {
    let { token } = socket.handshake.auth;

    if (!token) {
      return next(new Error('Token no proporcionado'));
    }

    try {
      if (typeof token === 'string' && token.startsWith('j%3A')) {
        const decoded = decodeURIComponent(token); // Decodificar URL
        const parsed = JSON.parse(decoded.slice(2)); // Quitar 'j:' y parsear
        token = parsed.data; // Extraer el JWT puro
      }

      const decodedVerify = jwt.verify(token, TOKEN_SECRET);

      const { rows: user } = await pool.query(
        'SELECT id, name, role FROM users WHERE id = $1',
        [decodedVerify.id]
      );
      if (user.length) {
        socket.user = { id: user[0].id, role: 'customer', name: user[0].name };
        return next();
      }

      const { rows: seller } = await pool.query(
        'SELECT id, name FROM sellers WHERE id = $1',
        [decodedVerify.id]
      );
      if (seller.length) {
        socket.user = {
          id: seller[0].id,
          role: 'seller',
          name: seller[0].name,
        };
        return next();
      }

      return next(new Error('Usuario no encontrado'));
    } catch (err) {
      console.log('Error al verificar token:', err.message); // ✅ Verifica el error que se genera
      return next(new Error('Token inválido', { typeError: 'TOKEN_INVALID' }));
    }
  });
};
