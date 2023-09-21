import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import posReducer from './POS/posSlice';
import productReducer from './product/productSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pos: posReducer,
    product: productReducer,
    // Add more reducers here
  },
  middleware: [thunk],
});