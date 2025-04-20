import { Router } from 'express';
import {
  productUpdateSchema,
  productCreateSchema,
} from '../schemas/products.schema.js';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  createAllProducts,
} from '../controllers/products.controllers.js';
import { checkAuthorizade } from '../middleware/validateTokens.midleware.js';
import { validateSchema } from '../middleware/validateSchemas.midleware.js';

//? Instanciamos un router para manejar las rutas
const productsRoutes = Router();

//? Definimos las rutas para los productos
const routeProducts = '/product';

//! Rutas para los productos
// * obtener todos los productos
productsRoutes.get(`/products`, getProducts);

// * obtener un producto por id
productsRoutes.get(
  `${routeProducts}/:id`,
  getProduct
);

// * crear un producto
productsRoutes.post(
  `${routeProducts}/:idSeller`,
  checkAuthorizade('seller'),
  validateSchema(productCreateSchema),
  createProduct
);

// * eliminar un producto
productsRoutes.delete(
  `${routeProducts}/:id`,
  checkAuthorizade('seller'),
  deleteProduct
);

// * editar un producto
productsRoutes.put(
  `${routeProducts}/:id`,
  checkAuthorizade('seller'),
  validateSchema(productUpdateSchema),
  updateProduct
);

// temporal url para pruebas
productsRoutes.post(`${routeProducts}All`, createAllProducts);

export default productsRoutes;
