import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import netappCVOReducer from 'features/netappCVO/netappCVOSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    netappCVO: netappCVOReducer,
  },
})
