import { useAppSelector } from '../../hooks/store.ts';
import Layout from '../../layaout/Layaout.tsx';

const Product = () => {
  const products = useAppSelector((state) => state.products);

  if (!products || products.length === 0) {
    return <div>No hay productos cargados. Ve al inicio para cargarlos.</div>;
  }

  return (
    <Layout>
      <h1>Products</h1>
      {products.map((productItems) => {
        const { product } = productItems;
        return (
          <div key={product?.id}>
            <h2>{product?.name}</h2>
            <p>{product?.category}</p>
            <p>{product?.price}</p>
          </div>
        );
      })}
    </Layout>
  );
};

export default Product;
