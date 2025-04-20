import { Router } from 'express';
import { checkAuthorizade } from '../middleware/validateTokens.midleware.js';
import {
  register,
  login,
  deleteAcount,
  editAcount,
  createAllUsers,
  logOut,
} from '../controllers/authUser.contollers.js';
import {
  userRegisterSchema,
  loginSchema,
  userUpdateSchema,
} from '../schemas/auth.schema.js';
import { validateSchema } from '../middleware/validateSchemas.midleware.js';

//? Instanciamos un router para manejar las rutas
const usersRoutes = Router();

//? Definimos las rutas para los usuarios
const routeAuth = '/user';

//! Rutas para los usuarios

// *  Registrar un usuario
usersRoutes.post(
  `${routeAuth}/register`,
  validateSchema(userRegisterSchema),
  register
);


// * logear un usuario
usersRoutes.post(`${routeAuth}/login`, validateSchema(loginSchema), login);


// * eliminar datos de un usuario
usersRoutes.delete(
  `${routeAuth}/:id`,
  checkAuthorizade('user'),
  deleteAcount
);


// * editar datos de un usuario
usersRoutes.put(
  `${routeAuth}/:id`,
  checkAuthorizade('user'),
  validateSchema(userUpdateSchema),
  editAcount
);


// * cerrar sesión de un usuario
usersRoutes.post(`${routeAuth}/logout`, logOut);



// temporal url para pruebas
usersRoutes.post(`${routeAuth}/all`, createAllUsers);

export default usersRoutes;
