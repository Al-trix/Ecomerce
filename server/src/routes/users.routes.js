import { Router } from 'express';
import { checkAuthorizade } from '../middleware/validateTokens.midleware.js';
import {
  register,
  login,
  deleteAcount,
  editAcount,
  createAllUsers,
} from '../controllers/auth.contollers.js';

const usersRoutes = Router();
// * las rutas de los usuarios se manejaran en /auth
const routeAuth = '/user';

usersRoutes.post(`${routeAuth}/login`, login);
usersRoutes.post(`${routeAuth}/register`, register);
usersRoutes.delete(`${routeAuth}/:id`,checkAuthorizade, deleteAcount);
usersRoutes.put(`${routeAuth}/:id`, checkAuthorizade ,editAcount);

// temporal url para pruebas
usersRoutes.post(`${routeAuth}/all`, createAllUsers);

export default usersRoutes;
