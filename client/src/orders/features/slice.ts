import { createSlice } from '@reduxjs/toolkit';
import type { OrderResponse } from '../../types/shopServices.d.ts';

const initialState: OrderResponse[] = [];

const ordersReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
});

export default ordersReducer.reducer;
