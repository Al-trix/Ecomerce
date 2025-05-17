import { createSlice } from '@reduxjs/toolkit';
import type { AuthUserResponse } from '../../types/auth.d.ts'

const initialState: AuthUserResponse = {
  user: null,
  carts: [],
  orders: []
}

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export default userReducer.reducer;
