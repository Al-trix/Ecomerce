import { Router } from 'express';
import {register, login, deleteAcount, editAcount} from '../controllers/auth.contollers.js'

const usersRoutes = Router();
// * las rutas de los usuarios se manejaran en /auth
const routeAuth = '/auth';

usersRoutes.post(`${routeAuth}/login`, login);
usersRoutes.post(`${routeAuth}/register`, register);
usersRoutes.delete(`${routeAuth}/:id`, deleteAcount);
usersRoutes.put(`${routeAuth}/:id`,editAcount);


export default usersRoutes;
