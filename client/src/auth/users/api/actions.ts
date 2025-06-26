import axios from '../../../api/instance.ts';
import type { FuntionActionsApi } from '../../../types/funtions.d.ts';
import { enums } from '../../../types/constantes.ts';

export const registerUser: FuntionActionsApi['users']['register'] = (dataUser) =>
  axios.post(`${enums.USER}/register`, dataUser);

export const loginUser: FuntionActionsApi['users']['login'] = (dataUser) =>
  axios.post(`${enums.USER}/login`, dataUser);

export const logoutUser: FuntionActionsApi['users']['logout'] = () =>
  axios.get(`${enums.USER}/logout`);

export const deleteUser: FuntionActionsApi['users']['delete'] = (userId) =>
  axios.delete(`${enums.USER}/${userId}`);

export const updateUser: FuntionActionsApi['users']['update'] = (
  userId,
  dataUser
) => axios.put(`${enums.USER}/${userId}`, dataUser);

export const getUserForToken: FuntionActionsApi['users']['getUserForToken'] = () =>
  axios.get(`${enums.USER}/token`); 
