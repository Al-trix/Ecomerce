import { Router } from "express";
import {createCart, deleteCart, getCart, updateCart} from "../controllers/cart.controllers.js";
const cartRoutes = Router();

const routeCart = '/cart';

cartRoutes.get(`${routeCart}:userId`, (req, res) => getCart)
cartRoutes.post(`${routeCart}:userId`, (req, res) => createCart)
cartRoutes.delete(`${routeCart}:id`, (req, res) => deleteCart)
cartRoutes.put(`${routeCart}:id`, (req, res) => updateCart)
