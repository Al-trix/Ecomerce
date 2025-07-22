import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "../products/api/actions";
import type {
  DataResponseProducts,
  MessageError,
} from "../types/shopServices.d.ts";

const useProducts = () => {
  const { data: response, error, status } = useSuspenseQuery<
     DataResponseProducts,
     MessageError
   >({
     queryKey: ['products'],
     queryFn: async () => {
       const { data } = await getProducts(15, 1);
       return data;
     },
   });

   const responseBody = response.body.products;

   return {responseBody, error, status};
} 

export default useProducts;

 