import { useLocation } from 'react-router';

const ProductsCategory = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/').pop();  


  return (
    <div>
     {category}
    </div>
  );
};

export default ProductsCategory;
