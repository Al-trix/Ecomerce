import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/users.routes.js';
import sellersRoutes from './routes/sellers.routes.js';
import productsRoutes from './routes/products.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// Settings and middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use(usersRoutes);
app.use(sellersRoutes);
app.use(productsRoutes);

export default app;