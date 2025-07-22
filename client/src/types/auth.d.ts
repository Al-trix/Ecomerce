import { OrderResponse, CartResponse, ProductsResponde} from './shopServices'

export type messageNotFound = {
  message: string | null;
};

export interface Auth {
  name: string | null;
  email: string | null;
  password: string | null;
  address: string | null;
  phone: string | null;
  avatar: string | null;
  city: string | null;
} 

type AuthUserError = {
  name: string | null;
  email: string | null;
  password: string | null;
  address: string | null;
  phone: string | null;
  avatar: string | null;
  city: string | null;
  typeError: string | null;
}

export interface AuthSeller extends Auth {
  store_name: string | null;
  rating: number | null;
}


export type PartialAuthUser = Partial<Auth>;
export type PartialAuthUserError = Partial<AuthUserError>;

export type PartialAuthSeller = Partial<AuthSeller>;
export type AuthLogin = Pick<AuthUser, 'email' | 'password'> 
export type AuthPartialLogin = Partial<AuthLogin>

export type AuthUserResponse = {
  user: Auth & {id: string} | null;
  carts: CartResponse[] | [];
  orders: OrderResponse[] | [];
} | null

export type AuthSellerResponse = {
  seller: AuthSeller & {id: string} | null;
  products: ProductsResponde[] | [];  
}
export type responseAuthUser = {
  message: string;
  body: AuthUserResponse;
}

export type responseAuthSeller = {
  message: string;
  body: AuthSellerResponse;
}
