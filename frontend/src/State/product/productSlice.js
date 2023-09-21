import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  productCategories: [],
  productCategory: null,
  isFetching: false,
  isError: false
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    deleteProduct: (state, action) => {
      state.product = null;
    },
    getProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    getProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    setProductCategories: (state, action) => {
      state.productCategories = action.payload.productCategories;
    },
    deleteProductCategory: (state, action) => {
      state.productCategory = null;
    },
    getIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    getIsError: (state, action) => {
      state.isError = action.payload;
    }
  }
});

export const {
  getProduct,
  setProduct,
  getProducts,
  setProducts,
  deleteProduct,
  getProductCategory,
  setProductCategory,
  getProductCategories,
  setProductCategories,
  deleteProductCategory,
  getIsFetching,
  getIsError
} = productSlice.actions;

export default productSlice.reducer;
