import axios from 'axios';
import type { AxiosResponse } from 'axios';

type Cart = {
  userId: string;
  product: {
    id: string;
    quantity: number;
  };
};
type PartialCart = Partial<Cart>;

type FuntionActions = {
  getCarts: (userId: string) => Promise<AxiosResponse>;
  createCart: (userId: string, dataCart: Cart) => Promise<AxiosResponse>;
  updateCart: (
    cartId: string,
    updateInfo: PartialCart
  ) => Promise<AxiosResponse>;
  deleteCart: (cartId: string) => Promise<AxiosResponse>;
};

const enums = {
  CART: 'cart',
};

export const getCarts: FuntionActions['getCarts'] = (userId) =>
  axios.get(`${enums.CART}/${userId}`);

export const createCart: FuntionActions['createCart'] = (userId, dataCart) =>
  axios.post(`${enums.CART}/${userId}`, dataCart);

export const updateCart: FuntionActions['updateCart'] = (cartId, updateCart) =>
  axios.put(`${enums.CART}/${cartId}`, updateCart);

export const deleteCart: FuntionActions['deleteCart'] = (cartId) =>
  axios.delete(`${enums.CART}/${cartId}`);
