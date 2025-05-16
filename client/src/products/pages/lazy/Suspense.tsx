import { Suspense } from 'react';
import { lazy } from 'react';

const Products = lazy(() => import('../Products.tsx'));

export const SuspenseProducts = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Products />
    </Suspense>
  );
};
