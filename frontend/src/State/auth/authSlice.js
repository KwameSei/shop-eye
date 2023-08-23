import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    // isSignedIn: false,
    isLoading: false,
    error: null,
    user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // signIn: (state, action) => {
    //   state.token = action.payload.token;
    //   state.isSignedIn = true;
    //   state.isLoading = false;
    //   state.error = null;
    //   state.user = action.payload.user;
    // },
    signOut: (state) => {
      state.token = null;
      state.isSignedIn = false;
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setLogin: (state, action) => {
      // state.user = {
      //   ...action.payload.user,
      //   name: action.payload.name,
      //   _id: action.payload.user._id,
      // }
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", action.payload.token);
    },
    setRegister: (state, action) => {
      state.user = {
        ...action.payload.user,
        name: action.payload.name,
        _id: action.payload.user._id,
      }
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { 
  signIn, 
  signOut, 
  setLoading, 
  setError,
  setLogin,
  setRegister,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;