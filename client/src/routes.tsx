import { createBrowserRouter } from 'react-router-dom';
import Product from './products/components/Product.tsx';
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
        path: 'register',
        element: (
          <div>
            <h1>Register</h1>
          </div>
        ),
      },
      {
        path: 'login',
        element: (
          <div>
            <h1>Login</h1>
          </div>
        ),
      },
    ],
  },
  {},
]);
