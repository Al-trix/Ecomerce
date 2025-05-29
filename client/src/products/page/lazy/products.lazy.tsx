import { lazy } from 'react';
import {Suspense} from 'react';

const LazyProducts = lazy(() => import('../Products.tsx'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);


const ProductsLazy = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyProducts />
    </Suspense>
  );
};

export default ProductsLazy;
