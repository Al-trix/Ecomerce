import { Router } from 'express';
import { checkAuthorizade } from '../../middleware/validateTokens.midleware.js';
import { validateSchema } from '../../middleware/validateSchemas.midleware.js';
import {
  createOrder,
  getOrders,
  deleteOrder,
  editOrder,
} from '../../controllers/api/orders.controllers.js';
import { orderSchema } from '../../schemas/orders.schema.js';

//? Instanciamos un router para manejar las rutas
const ordersRoutes = Router();

//? Definimos las rutas para los pedidos
const routeOrders = '/orders';

// * Obtener todos los pedidos de un usuario
ordersRoutes.get(`${routeOrders}/:userId`, checkAuthorizade('user'), getOrders);

// * Crear un pedido
ordersRoutes.post(
  `${routeOrders}/:userId`,
  checkAuthorizade('user'),
  validateSchema(orderSchema),
  createOrder
);

// * Eliminar un pedido
ordersRoutes.delete(
  `${routeOrders}/:id`,
  checkAuthorizade('user'),
  deleteOrder
);

// * Editar un pedido
ordersRoutes.put(`${routeOrders}/:id`, checkAuthorizade('user'), editOrder);

export default ordersRoutes;
