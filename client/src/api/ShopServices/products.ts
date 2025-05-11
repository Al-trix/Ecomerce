import axios from 'axios';
import type { AxiosResponse } from 'axios';

type Products = {
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category: string;
  discountPorcentage: number;
  rating: number;
};
type PartialProduct = Partial<Products>;

type FuntionActions = {
  getProducts: () => Promise<AxiosResponse>;
  getProduct: (productId: string) => Promise<AxiosResponse>;
  createProduct: (
    sellerId: string,
    dataProduct: Products
  ) => Promise<AxiosResponse>;
  updateProduct: (
    productId: string,
    updateInfo: PartialProduct
  ) => Promise<AxiosResponse>;
  deleteProduct: (productId: string) => Promise<AxiosResponse>;
};

const enums = {
  ROUTES: {
    PRODUCTS: 'products',
    PRODUCT: 'product',
  },
};

export const getProducts: FuntionActions['getProducts'] = () =>
  axios.get(`${enums.ROUTES.PRODUCTS}`);

export const getProduct: FuntionActions['getProduct'] = (productId) =>
  axios.get(`${enums.ROUTES.PRODUCT}/${productId}`);

export const createProduct: FuntionActions['createProduct'] = (
  sellerId,
  dataProduct
) => axios.post(`${enums.ROUTES.PRODUCTS}/${sellerId}`, dataProduct);

export const updateProduct: FuntionActions['updateProduct'] = (
  productId,
  updateInfo
) => axios.put(`${enums.ROUTES.PRODUCT}/${productId}`, updateInfo);

export const deleteProduct: FuntionActions['deleteProduct'] = (productId) =>
  axios.delete(`${enums.ROUTES.PRODUCT}/${productId}`);
