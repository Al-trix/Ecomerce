import { Router } from 'express';
import {
  registerSeller,
  loginSeller,
  updatedSeller,
  deleteSeller,
  createAllSellers,
} from '../controllers/authSeller.controllers.js';
import { checkAuthorizade } from '../middleware/validateTokens.midleware.js';
const sellersRoutes = Router();
const routeSellers = '/sellers';

sellersRoutes.post(`${routeSellers}`, registerSeller);
sellersRoutes.post(`${routeSellers}/login`, loginSeller);
sellersRoutes.put(`${routeSellers}/:id`, checkAuthorizade ,updatedSeller);
sellersRoutes.delete(`${routeSellers}/:id`, checkAuthorizade, deleteSeller);

// temporal url para pruebas

sellersRoutes.post(`${routeSellers}/all`, createAllSellers);

export default sellersRoutes;
