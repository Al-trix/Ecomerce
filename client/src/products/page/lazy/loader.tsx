import { getProducts } from '../../api/actions.ts';
import {useSuspenseQuery} from '@tanstack/react-query'

const loaderProducts = async () => {
  try {
    const res = await getProducts(15, 1);
    return res.data.body;
  } catch (error) {
    throw new Error(`Error cargando los productos: ${error}`);
  }
};

export default loaderProducts;
