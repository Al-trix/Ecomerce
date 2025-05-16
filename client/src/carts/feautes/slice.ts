import { createSlice } from '@reduxjs/toolkit';
import type { CartResponse } from '../../types/shopServices';

const initialState: CartResponse[]  = [];

const cartsReducer = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
});

export default cartsReducer.reducer;
