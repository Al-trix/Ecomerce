import { createSlice } from '@reduxjs/toolkit'
import type { AuthSellerResponse } from '../../types/auth'

const initialState: AuthSellerResponse = {
  seller: null,
  products: [],
}

const sellerReducer = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    
  }
})


export default sellerReducer.reducer
