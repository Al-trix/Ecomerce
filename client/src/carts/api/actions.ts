import axios from '../../api/instance.ts';
import type { FuntionActionsApi } from '../../types/funtions';
import { enums } from '../../types/funtions';

export const getCarts: FuntionActionsApi['carts']['getCarts'] = (userId) =>
  axios.get(`${enums.CART}/${userId}`);

export const createCart: FuntionActionsApi['carts']['createCart'] = (
  userId,
  dataCart
) => axios.post(`${enums.CART}/${userId}`, dataCart);

export const updateCart: FuntionActionsApi['carts']['updateCart'] = (
  cartId,
  updateCart
) => axios.put(`${enums.CART}/${cartId}`, updateCart);

export const deleteCart: FuntionActionsApi['carts']['deleteCart'] = (cartId) =>
  axios.delete(`${enums.CART}/${cartId}`);
