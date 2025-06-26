import { useSuspenseQuery } from '@tanstack/react-query';
import { getProducts } from '../api/actions.ts';
import type {
  DataResponseProducts,
  MessageError,
} from '../../types/shopServices.d.ts';
import ProductsList from '../components/ProductsList.tsx';
import Search from '../components/Search.tsx';

const Products = () => {
  const { data: response } = useSuspenseQuery<
    DataResponseProducts,
    MessageError
  >({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getProducts(15, 1);
      return data;
    },
  });

  return (
    <section>
      <div>
        <h3>Todos los productos a tu nesecidad</h3>
        <Search />
      </div>
      <ProductsList productsInfo={response.body} />
    </section>
  );
};

export default Products;
