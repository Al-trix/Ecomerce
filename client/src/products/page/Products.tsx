import { useLoaderData } from 'react-router-dom';
import type { ProductsResponse } from '../../types/shopServices';
import { NavLink } from 'react-router-dom';
import Layout from '../../layaout/Layaout.tsx';

const Products = () => {
  const productsInfo = useLoaderData<ProductsResponse>();
  
  if (!Array.isArray(productsInfo)) {
    type messageError = {
      message: string;
    };
    const productError: messageError = productsInfo;
    return <h1>{productError.message}</h1>;
  }
  if (!productsInfo) {
    return <h1>No se encontraron productos</h1>;
  }

  return (
    <Layout>
      <section className=" grid grid-cols-3 gap-3 grid-flow-row-dense container mx-auto bg-cyan-900 mt-10 p-10">
        <NavLink to="/products">product</NavLink>
        {productsInfo.map((productInfo) => {
          const { product, seller, reviews } = productInfo;
          return (
            <article className="bg-black/40" key={product?.id}>
              <div className="h-34  bg-gray-700 w-full "></div>
              <h1>{product?.name}</h1>
              <h2>{product?.price}</h2>
              <h3>{seller?.name}</h3>
              <h4>{reviews?.length}</h4>
            </article>
          );
        })}
      </section>
    </Layout>
  );
};

export default Products;
