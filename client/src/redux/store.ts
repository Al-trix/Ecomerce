import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../users/features/slice';
import sellerReducer from '../sellers/features/slice';
import productsSlice from '../products/features/slice';
import cartsSlice from '../carts/feautes/slice';
import ordersSlice from '../orders/features/slice';
import reviewsSlice from '../reviews/feautures/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productsSlice,
    orders: ordersSlice,
    carts: cartsSlice,
    reviews: reviewsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
