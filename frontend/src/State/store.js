import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import posReducer from './POS/posSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pos: posReducer,
    // Add more reducers here
  },
  middleware: [thunk],
});