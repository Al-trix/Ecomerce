//* importamos diferentes modulos para crear un servidor express
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.routes.js';
import sellersRoutes from './routes/sellers.routes.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import cookieParser from 'cookie-parser';

//* creamos una nueva instancia de express
const app = express();

//? Middlewares
app.use(morgan('dev')); // * Morgan: nos permite ver las peticiones que llegan al servidor
app.use(express.json()); // * Express.json: nos permite parsear el body de las peticiones a json
app.use(cookieParser()); // * CookieParser: nos permite parsear las cookies de las peticiones

//? Rutas 
app.use(usersRoutes);
app.use(sellersRoutes);
app.use(productsRoutes);
app.use(cartRoutes);

export default app;
