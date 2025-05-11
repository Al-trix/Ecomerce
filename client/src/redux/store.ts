import  {configureStore} from '@reduxjs/toolkit'
import userReducer from './feautures/auth/userSlice.ts'

const store = configureStore({
    reducer:{
        user: userReducer,
    }
})



export default store