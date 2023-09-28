import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: [],
  productCategories: [],
  productCategory: null,
  order: null,
  orders: [],
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
    },
    getOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    deleteOrder: (state, action) => {
      state.order = null;
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
  getIsError,
  getOrder,
  setOrder,
  getOrders,
  setOrders,
  deleteOrder
} = productSlice.actions;

export default productSlice.reducer;
