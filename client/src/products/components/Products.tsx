import Search from '../components/Search.tsx';
import useProducts from '../../hooks/useProducts.ts';
import ProductsList from './ProductsList.tsx';
import Category from './Category.tsx';

const Products = () => {
  const { responseBody } = useProducts();

  return (
    <section className=" p-7 w-11/12 mx-auto rounded-2xl border border-transparent relative  -top-60  bg-white">
      <div className=" flex w-11/12 mt-6 mx-auto  items-center justify-between">
        <h3 className="text-lg font-medium tracking-wider">
          Desde la comodidad de tu casa
        </h3>
        <Search />
      </div>
      <article className="grid grid-cols-[0.5fr_2fr] relative gap-4 mt-12 px-5">
        <div className="flex flex-col gap-4 ">
         <Category/>
        </div>

        <ProductsList productsInfo={responseBody} />
      </article>
    </section>
  );
};

export default Products;
