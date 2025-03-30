import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controllers.js";

const productsRoutes = Router();

const routeProducts = '/products';

productsRoutes.get(`${routeProducts}`, getProducts);
productsRoutes.get(`${routeProducts}/:id`, getProduct);
productsRoutes.post(`${routeProducts}`, createProduct);
productsRoutes.delete(`${routeProducts}/:id`, deleteProduct);
productsRoutes.put(`${routeProducts}/:id`, updateProduct);

export default productsRoutes;
