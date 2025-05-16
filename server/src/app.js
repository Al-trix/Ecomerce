//* importamos diferentes modulos para crear un servidor express
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/api/users.routes.js';
import sellersRoutes from './routes/api/sellers.routes.js';
import productsRoutes from './routes/api/products.routes.js';
import ordersRoutes from './routes/api/orders.routes.js';
import cartRoutes from './routes/api/cart.routes.js';
import reviewsRoutes from './routes/api/reviews.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//* creamos una nueva instancia de express
const app = express();

//? Middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev')); // * Morgan: nos permite ver las peticiones que llegan al servidor
app.use(express.json()); // * Express.json: nos permite parsear el body de las peticiones a json
app.use(cookieParser()); // * CookieParser: nos permite parsear las cookies de las peticiones

//? Rutas
app.use(usersRoutes);
app.use(sellersRoutes);
app.use(productsRoutes);
app.use(cartRoutes);
app.use(ordersRoutes);
app.use(reviewsRoutes);

export default app;
