import { Router } from 'express';
import {
  registerSeller,
  loginSeller,
  updatedSeller,
  deleteSeller,
  logOut,
  validateInfoTokenSeller,
} from '../../controllers/api/authSeller.controllers.js';
import { checkAuthorizade } from '../../middleware/validateTokens.midleware.js';
import { validateSchema } from '../../middleware/validateSchemas.midleware.js';
import {
  loginSchema,
  sellerRegisterSchema,
  sellerUpdateSchema,
} from '../../schemas/auth.schema.js';

//? Instanciamos un router para manejar las rutas
const sellersRoutes = Router();

//? Definimos las rutas para los vendedores
const routeSellers = '/seller';

//! Rutas para los vendedores

// *  Registrar un vendedor
sellersRoutes.post(
  `${routeSellers}/register`,
  validateSchema(sellerRegisterSchema),
  registerSeller
);

// * logear un vendedor
sellersRoutes.post(
  `${routeSellers}/login`,
  validateSchema(loginSchema),
  loginSeller
);

// * editar datos de un vendedor
sellersRoutes.put(
  `${routeSellers}/:id`,
  checkAuthorizade('seller'),
  validateSchema(sellerUpdateSchema),
  updatedSeller
);

// * eliminar datos de un vendedor
sellersRoutes.delete(
  `${routeSellers}/:id`,
  checkAuthorizade('seller'),
  deleteSeller
);

// * cerrar sesión de un vendedor
sellersRoutes.post(`${routeSellers}/logout`, logOut);

// * validar token de un vendedor
sellersRoutes.get(
  `${routeSellers}/token`,
  checkAuthorizade('seller'),
  validateInfoTokenSeller
);

export default sellersRoutes;
