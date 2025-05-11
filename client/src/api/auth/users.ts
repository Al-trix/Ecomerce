import axios from 'axios';
import type { AxiosResponse } from 'axios';

type UserAuth = {
  name: string;
  email: string;
  password: string;
  adress: string;
  phone: string;
  avatar: string;
  city: string;
};

type PartialAuth = Partial<UserAuth>;
type LoginAuth = Pick<UserAuth, 'email' | 'password'>;

type FuntionActions = {
  register: (dataUser: UserAuth) => Promise<AxiosResponse>;
  login: (dataUser: LoginAuth) => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  delete: (userId: string) => Promise<AxiosResponse>;
  update: (userId: string, dataUser: PartialAuth) => Promise<AxiosResponse>;
  getUserForToken: () => Promise<AxiosResponse>;
};

const enums = {
  ROLE: 'users',
};

export const registerUse: FuntionActions['register'] = (dataUser) =>
  axios.post(`${enums.ROLE}/register`, dataUser);

export const loginUser: FuntionActions['login'] = (dataUser) =>
  axios.post(`${enums.ROLE}/login`, dataUser);

export const logoutUser: FuntionActions['logout'] = () =>
  axios.get(`${enums.ROLE}/logout`);

export const deleteUser: FuntionActions['delete'] = (userId) =>
  axios.delete(`${enums.ROLE}/${userId}`);

export const updateUser: FuntionActions['update'] = (userId, dataUser) =>
  axios.put(`${enums.ROLE}/${userId}`, dataUser);

export const getUserForToken: FuntionActions['getUserForToken'] = () =>
  axios.get(`${enums.ROLE}/token`);
