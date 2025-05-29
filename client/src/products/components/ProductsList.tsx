import Product from "./Product";
import type { ProductsResponse } from '../../types/shopServices';

interface Props {
  productsInfo: ProductsResponse;
}
const ProductsList = ({ productsInfo }: Props) => {
  return (
    <section className="grid grid-cols-3 mx-auto w-full gap-x-2 gap-y-10 grid-flow-row-dense container place-items-center  mt-10 p-10">
      {productsInfo.map(({ product, seller, reviews }) => {
        if (!product) return null;
        return (
          <Product
            key={product.id || Math.random().toString()}
            infoProduct={product}
            infoSeller={seller}
            reviews={reviews}
          />
        );
      })}
    </section>
  );
};

export default ProductsList;
