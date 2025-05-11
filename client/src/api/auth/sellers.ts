import axios from 'axios';
import type { AxiosResponse } from 'axios';

type SellerAuth = {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  store_name: string;
  avatar: string;
  rating: number;
};

type PartialAuth = Partial<SellerAuth>;
type LoginAuth = Pick<SellerAuth, 'email' | 'password'>;

type FuntionActions = {
  register: (dataSeller: SellerAuth) => Promise<AxiosResponse>;
  login: (dataSeller: LoginAuth) => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  delete: (sellerId: string) => Promise<AxiosResponse>;
  update: (sellerId: string, dataSeller: PartialAuth) => Promise<AxiosResponse>;
  getSellerForToken: () => Promise<AxiosResponse>;
};

const enums = {
  ROLE: 'seller',
};

export const registerSeller: FuntionActions['register'] = (dataSeller) =>
  axios.post(`${enums.ROLE}/register`, dataSeller);

export const loginSeller: FuntionActions['login'] = (dataSeller) =>
  axios.post(`${enums.ROLE}/login`, dataSeller);

export const logoutSeller = () => axios.get(`${enums.ROLE}/logout`);

export const deleteSeller: FuntionActions['delete'] = (sellerId) =>
  axios.delete(`${enums.ROLE}/${sellerId}`);

export const updateSeller: FuntionActions['update'] = (sellerId, dataSeller) =>
  axios.put(`${enums.ROLE}/${sellerId}`, dataSeller);

export const getSellerForToken: FuntionActions['getSellerForToken'] = () =>
  axios.get(`${enums.ROLE}/token`);
