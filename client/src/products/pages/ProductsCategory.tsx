import { useLocation } from 'react-router';

const ProductsCategory = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === '/categoria/electronicos' && <h1>Electronica</h1>}
    </div>
  );
};

export default ProductsCategory;
