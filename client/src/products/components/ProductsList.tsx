import type { ProductsResponse } from '../../types/shopServices';
import Product from './Product';

interface Props {
  productsInfo?: ProductsResponse;
}
const ProductsList = ({ productsInfo = [] }: Props) => {
  return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[240px_240px_240px] items-center justify-center gap-y-7 gap-x-4  w-full'>{
    productsInfo.map(({product, reviews}) => (
      <Product key={product?.id} infoProduct={product} reviews={reviews} />
    ))
  }</div>;
};

export default ProductsList;
