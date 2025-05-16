import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductsResponse } from '../../types/shopServices.d.ts';

const initialState: ProductsResponse = [];

const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductsToState: (state, action: PayloadAction<ProductsResponse>) => {
      if (Array.isArray(action.payload) && Array.isArray(state)) {
        return [...action.payload];  // Reemplaza el estado con los nuevos productos
      }
      return state;  // Devuelve el estado sin cambios si la condición no se cumple
    },
  },
});

export const { addProductsToState } = productsReducer.actions;
export default productsReducer.reducer;
