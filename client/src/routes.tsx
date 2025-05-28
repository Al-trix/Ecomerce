import { createBrowserRouter } from 'react-router-dom';
import Product from './products/components/Product.tsx';
import AuthLogin from './auth/page/AuthLogin.tsx';
import TypeAuth from './auth/page/TypeAuth.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    hydrateFallbackElement: (
      <div>
        <h1>Loading...</h1>
      </div>
    ),

    lazy: async () => {
      const [component, loader] = await Promise.all([
        import('./products/page/Products.tsx'),
        import('./products/page/lazy/loader.tsx'),
      ]);
      return {
        Component: component.default,
        loader: loader.default,
      };
    },
  },
  {
    path: '/products',
    element: <Product />,
  },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <TypeAuth />,
      },
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
  {},
]);
