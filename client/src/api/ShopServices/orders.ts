import axios from 'axios';
import type { AxiosResponse } from 'axios';

type Order = {
  status: 'pending' | 'completed' | 'canceled';
};

type FuntionActions = {
  getOrders: (userId: string) => Promise<AxiosResponse>;
  createOrder: (userId: string, dataOrder: Order) => Promise<AxiosResponse>;
  updateOrder: (
    orderId: string,
    updateInfo: Order['status']
  ) => Promise<AxiosResponse>;
  deleteOrder: (orderId: string) => Promise<AxiosResponse>;
};
const enums = {
  ORDERS: 'orders',
};
export const getOrders: FuntionActions['getOrders'] = (userId) =>
  axios.get(`${enums.ORDERS}/${userId}`);

export const createOrder: FuntionActions['createOrder'] = (userId, dataOrder) =>
  axios.post(`${enums.ORDERS}/${userId}`, dataOrder);

export const updateOrder: FuntionActions['updateOrder'] = (
  orderId,
  updateInfo
) => axios.put(`${enums.ORDERS}/${orderId}`, updateInfo);

export const deleteOrder: FuntionActions['deleteOrder'] = (orderId) =>
  axios.delete(`${enums.ORDERS}/${orderId}`);
