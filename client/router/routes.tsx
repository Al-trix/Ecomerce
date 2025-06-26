import { createBrowserRouter } from 'react-router-dom';
import loaderProducts from '../src/products/page/lazy/loader.tsx';
import Layaout from '../src/layaout/Layaout.tsx';
import ProductsLazy from '../src/products/page/lazy/products.lazy.tsx';
import ProtectedRoutes from '../src/layaout/components/ProtectedRoutes.tsx';
import CreateAcount from '../src/auth/page/CreateAcount.tsx';

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
        element: <CreateAcount />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'protected',
            element: <div>Protected Routes</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
