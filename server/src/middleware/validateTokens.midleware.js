import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const checkAuthorizade = (req, res, next) => {
  const { access_token } = req.cookies;
  try {
    if (!access_token) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    if (access_token.role === 'user') {
      const token = access_token?.data;
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.user = decoded;
      next();
      return;
    }

    if (access_token.role === 'seller') {
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
