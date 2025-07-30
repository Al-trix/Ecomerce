import axios from '../../api/instance.ts';
import type { FuntionActionsApi } from '../../types/funtions.d.ts';
import { enums } from '../../types/constantes.ts';

export const getProducts: FuntionActionsApi['products']['getProducts'] = (
  limit = 10,
  page,
  category
) => axios.get(`${enums.ROUTES_PRODUCTS.PRODUCTS}?limit=${limit}&page=${page}&`);

export const getProduct: FuntionActionsApi['products']['getProduct'] = (
  productId
) => axios.get(`${enums.ROUTES_PRODUCTS.PRODUCT}/${productId}`);

export const createProduct: FuntionActionsApi['products']['createProduct'] = (
  sellerId,
  dataProduct
) => axios.post(`${enums.ROUTES_PRODUCTS.PRODUCTS}/${sellerId}`, dataProduct);

export const updateProduct: FuntionActionsApi['products']['updateProduct'] = (
  productId,
  updateInfo
) => axios.put(`${enums.ROUTES_PRODUCTS.PRODUCT}/${productId}`, updateInfo);

export const deleteProduct: FuntionActionsApi['products']['deleteProduct'] = (
  productId
) => axios.delete(`${enums.ROUTES_PRODUCTS.PRODUCT}/${productId}`);
