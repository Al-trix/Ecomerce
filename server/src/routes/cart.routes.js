import { Router } from 'express';
import {
  createCart,
  deleteCart,
  getCart,
  updateCart,
} from '../controllers/cart.controllers.js';
import { checkAuthorizade } from '../middleware/validateTokens.midleware.js';
import { validateSchema } from '../middleware/validateSchemas.midleware.js';
import {
  createCartSchema,
  updateCartSchema,
} from '../schemas/cart.schema.js';

//? Instanciamos un router para manejar las rutas
const cartRoutes = Router();

//? Definimos las rutas para el carrito
const routeCart = '/cart';

//! Rutas para el carrito

//* obtener el carrito de un usuario
cartRoutes.get(
  `${routeCart}/:userId`,
  checkAuthorizade('user'),
  getCart
);

//* crear un carrito para un usuario
cartRoutes.post(
  `${routeCart}/:userId`,
  checkAuthorizade('user'),
  validateSchema(createCartSchema),
  createCart
);

//* actualizar un carrito por id
cartRoutes.put(
  `${routeCart}/:id`,
  checkAuthorizade('user'),
  validateSchema(updateCartSchema),
  updateCart
);

//* eliminar un carrito por id
cartRoutes.delete(
  `${routeCart}/:id`,
  checkAuthorizade('user'),
  deleteCart
);

export default cartRoutes;
