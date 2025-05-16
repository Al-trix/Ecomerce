import { useAppSelector } from "../../hooks/store.ts";

const Product = () => {
  const products = useAppSelector((state) => state.products);
  console.log(products);

  return (
    <div>
      cargando....
    </div>
  )
}

export default Product
