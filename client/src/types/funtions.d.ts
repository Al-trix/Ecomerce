import type { AxiosResponse } from '../../api/instance.ts';
import type {
  AuthLogin,
  PartialAuthUser,
  PartialAuthSeller,
} from './auth';

import type {
  Cart,
  Order,
  PartialCart,
  PartialOrder,
  PartialProduct,
  PartialReview,
  Products,
  Review,
} from './shopServices';

//! Types para las funciones de las rutas de la API
export type FuntionActionsApi = {
  users: {
    register: (dataUser: PartialAuthUser) => Promise<AxiosResponse>;
    login: (dataUser: AuthLogin) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
    delete: (userId: string) => Promise<AxiosResponse>;
    update: (
      userId: string,
      dataUser: PartialAuthUser
    ) => Promise<AxiosResponse>;
    getUserForToken: () => Promise<AxiosResponse>;
  };
  sellers: {
    register: (dataSeller: PartialAuthSeller) => Promise<AxiosResponse>;
    login: (dataSeller: AuthLogin) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
    delete: (sellerId: string) => Promise<AxiosResponse>;
    update: (
      sellerId: string,
      dataSeller: PartialAuthSeller
    ) => Promise<AxiosResponse>;
    getSellerForToken: () => Promise<AxiosResponse>;
  };
  products: {
    getProducts: (limit?: number, page: number) => Promise<AxiosResponse>;
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
  orders: {
    getOrders: (userId: string) => Promise<AxiosResponse>;
    createOrder: (userId: string, dataOrder: Order) => Promise<AxiosResponse>;
    updateOrder: (
      orderId: string,
      updateInfo: PartialOrder
    ) => Promise<AxiosResponse>;
    deleteOrder: (orderId: string) => Promise<AxiosResponse>;
  };
  carts: {
    getCarts: (userId: string) => Promise<AxiosResponse>;
    createCart: (userId: string, dataCart: Cart) => Promise<AxiosResponse>;
    updateCart: (
      cartId: string,
      updateInfo: PartialCart
    ) => Promise<AxiosResponse>;
    deleteCart: (cartId: string) => Promise<AxiosResponse>;
  };
  reviews: {
    createReview: (
      userId: string,
      dataReview: Review
    ) => Promise<AxiosResponse>;
    updateReview: (
      reviewId: string,
      updateInfo: PartialReview
    ) => Promise<AxiosResponse>;
    deleteReview: (reviewId: string) => Promise<AxiosResponse>;
  };
};

 
