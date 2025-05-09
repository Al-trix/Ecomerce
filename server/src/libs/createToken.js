import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const createToken = (payload, role , nameCookie, res) => {  
  
  try {
    const payloadToken = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn : '3d'
    });

    const payloadInfo = {
      data: payloadToken,
      role
    }

    res.cookie(nameCookie, payloadInfo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  } catch (err) {
    console.error('Error creating token:', err);
    throw new Error('Token creation failed');
  }
};
