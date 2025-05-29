import { createBrowserRouter } from 'react-router-dom';
import AuthLogin from '../src/auth/page/AuthLogin.tsx';
import TypeAuth from '../src/auth/page/TypeAuth.tsx';
import loaderProducts from '../src/products/page/lazy/loader.tsx';
import Layaout from '../src/layaout/Layaout.tsx';
import ProductsLazy from '../src/products/page/lazy/products.lazy.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layaout />,
    children: [
      {
        index: true,
        element: <div>Página de inicio</div>,
      },
      {
        path: 'products',
        loader: loaderProducts,
        element: <ProductsLazy />,
      },
      {
        path: 'auth',
        element: <TypeAuth />,
        children: [
          {
            path: 'seller',
            children: [
              {
                index: true,
                element: <TypeAuth />,
              },
              {
                path: 'register',
                element: <div>Register seller</div>,
              },
              {
                path: 'login',
                element: <AuthLogin />,
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                index: true,
                element: <TypeAuth />,
              },
              {
                path: 'register',
                element: <div>Register user</div>,
              },
              {
                path: 'login',
                element: <div>Login user</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
