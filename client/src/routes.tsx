import { createBrowserRouter } from 'react-router-dom';
import { SuspenseProducts } from './products/pages/lazy/Suspense.tsx';
import { loaderProducts } from './products/pages/lazy/loader.tsx';
import Product from './products/components/Product.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseProducts />
    ),
    loader: loaderProducts,
  },
  {
    path: '/products',
    element: (
      <Product />
    ),
  },
]);
