import { getProducts } from '../../api/actions.ts';
import { queryClient } from '../../../lib/queryClient';

const loaderProducts = async () => {
  return await queryClient.ensureQueryData({
    queryKey: ['products'],
    queryFn: async () => {

      const { data } = await getProducts(15, 1);
      return data;
    },
  });
};

export default loaderProducts;
