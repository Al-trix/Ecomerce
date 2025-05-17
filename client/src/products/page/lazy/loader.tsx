import { getProducts } from '../../api/actions.ts';

const loaderProducts = async () => {
  try {
    const res = await getProducts(15, 1);
    return res.data.body;
  } catch (error) {
    throw new Error(`Error cargando los productos: ${error}`);
  }
};

export default loaderProducts;
