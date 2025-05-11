import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

type UserState ={
  value: number
}

const initialState: UserState = {
  value: 0
}

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default userReducer.reducer;
