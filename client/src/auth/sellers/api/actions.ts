import axios from '../../../api/instance';
import  { enums } from '../../../types/constantes';
import type { FuntionActionsApi } from '../../../types/funtions';


export const registerSeller: FuntionActionsApi['sellers']['register'] = (
  dataSeller
) => axios.post(`${enums.SELLER}/register`, dataSeller);

export const loginSeller: FuntionActionsApi['sellers']['login'] = (
  dataSeller
) => axios.post(`${enums.SELLER}/login`, dataSeller);

export const logoutSeller = () => axios.get(`${enums.SELLER}/logout`);

export const deleteSeller: FuntionActionsApi['sellers']['delete'] = (
  sellerId
) => axios.delete(`${enums.SELLER}/${sellerId}`);

export const updateSeller: FuntionActionsApi['sellers']['update'] = (
  sellerId,
  dataSeller
) => axios.put(`${enums.SELLER}/${sellerId}`, dataSeller);

export const getSellerForToken: FuntionActionsApi['sellers']['getSellerForToken'] =
  () => axios.get(`${enums.SELLER}/token`);
