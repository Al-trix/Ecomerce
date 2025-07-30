import { createBrowserRouter } from 'react-router-dom';
import loaderProducts from '../src/products/lazy/loader.tsx';
import Layaout from '../src/layaout/Layaout.tsx';
import ProtectedRoutes from '../src/layaout/components/ProtectedRoutes.tsx';
import AuthRouteDecider from './hooks/ProtectedRoutes';
import Home from '../src/layaout/Home.tsx';
import ProductsCategory from '../src/products/pages/ProductsCategory.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layaout />,
    children: [
      {
        index: true,
        loader: loaderProducts,
        element: <Home />,
      },
      {
        path: 'category/:category',
        element: <ProductsCategory />,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <AuthRouteDecider isLogin />,
          },
          {
            path: 'register',
            element: <AuthRouteDecider isLogin={false} />,
          },
        ],
      },

      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'prod',
            element: <div>Protected Routes</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
