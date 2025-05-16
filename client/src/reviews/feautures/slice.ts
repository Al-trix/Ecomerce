import { createSlice } from '@reduxjs/toolkit';
import type { Review } from '../../types/shopServices.d.ts';

const initialState: Review[] = [];

const reviewsReducer = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
});

export default reviewsReducer.reducer;
