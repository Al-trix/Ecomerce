import { pool } from "../db";
import { registerSeller, loginSeller, updatedSeller, deleteSeller, getSeller, getSellers } from "../controllers/sellers.controllers";

const sellersRoutes = Router();
const routeSellers = '/sellers';

sellersRoutes.get(`${routeSellers}`, getSellers);
sellersRoutes.get(`${routeSellers}/:id`, getSeller);
sellersRoutes.post(`${routeSellers}`, registerSeller);
sellersRoutes.post(`${routeSellers}/login`, loginSeller);
sellersRoutes.put(`${routeSellers}/:id`, updatedSeller);
sellersRoutes.delete(`${routeSellers}/:id`, deleteSeller);

export default sellersRoutes;
