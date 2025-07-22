import type { AuthSeller } from './auth';

//! Types para errores
export type MessageError = {
  message: string;
};


//! Types para el carrito
export type Cart = {
  userId: string | null;
  status: null | 'pending' | 'completed' | 'canceled';
  product: {
    id: string;
    quantity: number;
  };
};

type CartResponse = {
  carts: {
    dataCart: {
      id: string | null;
      quantity: number | null;
      status: 'pending' | 'completed' | 'canceled' | null;
      product: {
        id: string | null;
        name: string | null;
        price: number | null;
        image_url: string | null;
        discountPorcentage: number | null;
      } | null;
    } | null;
  } | null;
};

export type PartialCart = Partial<Cart>;

//! Types para ordenes
export type Order = {
  status: 'pending' | 'completed' | 'canceled' | null;
} | null;

type orderItem =
  | {
      itemId: string | null;
      subtotal: number | null;
      product: (Omit<Product, 'rating' | 'stock'> & { id: string }) | null;
    }[]
  | [];

export type OrderResponse = {
  orderId: string | null;
  total_price: number | null;
  status: 'pending' | 'completed' | 'canceled' | null;
  created_at: string | null;
  items: orderItem | [];
};

export type PartialOrder = Partial<Order>;

//! Types para productos
export type Product = {
  id?: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  image_url: string | null;
  stock: number | null;
  category: string | null;
  discountPercentage: number | null;
  rating: number | null;
} | null;

export type ProductsResponse = {
  product: Product ;
  seller: AuthSeller;
  reviews: Review[] | [];
}[];

export type PartialProduct = Partial<Products>;
//! Types para reviews
export type Review = {
  id?: string | null;
  productId: string | null;
  userId: string | null;
  rating: number | null;
  comment: string | null;
};
export type PartialReview = Partial<Review>;

//! Types para respuestas
export type DataResponseProducts = {
  message: string;
  body: {
    limit: number;
    products: ProductsResponse;
    hasPrev: boolean;
    hasNext: boolean;
    page: number;
    totalPages: number;
    totalProducts: number;
  };
};