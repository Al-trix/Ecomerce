import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

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

     if (access_token.role === 'seller' && typeUser === 'seller') {
       const token = access_token?.data;
       const decoded = jwt.verify(token, TOKEN_SECRET);
       req.userSeller = decoded;
       next();
       return;
     }

  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({
      message: 'Invalid token',
    });
  }
};

