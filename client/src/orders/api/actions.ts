import axios from '../../api/instance.ts';
import type { FuntionActionsApi } from '../../types/funtions.d.ts';
import { enums } from '../../types/constantes.ts';

export const getOrders: FuntionActionsApi['orders']['getOrders'] = (userId) =>
  axios.get(`${enums.ORDERS}/${userId}`);

export const createOrder: FuntionActionsApi['orders']['createOrder'] = (
  userId,
  dataOrder
) => axios.post(`${enums.ORDERS}/${userId}`, dataOrder);

export const updateOrder: FuntionActionsApi['orders']['updateOrder'] = (
  orderId,
  updateInfo
) => axios.put(`${enums.ORDERS}/${orderId}`, updateInfo);

export const deleteOrder: FuntionActionsApi['orders']['deleteOrder'] = (
  orderId
) => axios.delete(`${enums.ORDERS}/${orderId}`);
