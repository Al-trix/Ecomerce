import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, createAllProducts } from "../controllers/products.controllers.js";
import { checkAuthorizade } from "../middleware/validateTokens.midleware.js";

const productsRoutes = Router();

const routeProducts = '/products';

productsRoutes.get(`${routeProducts}`, getProducts);
productsRoutes.get(`${routeProducts}/:id`, getProduct);
productsRoutes.post(`${routeProducts}/:idSeller`, checkAuthorizade ,createProduct);
productsRoutes.delete(`${routeProducts}/:id`, checkAuthorizade ,deleteProduct);
productsRoutes.put(`${routeProducts}/:id` , checkAuthorizade ,updateProduct);

// temporal url para pruebas
productsRoutes.post(`${routeProducts}All`, createAllProducts);

export default productsRoutes;
