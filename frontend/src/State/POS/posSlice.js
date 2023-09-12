import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pos: null,
  branch: null,
  supplier: null,
  poss: [],
  branches: [],
  suppliers: [],
  isFetching: false,
  isError: false
};

const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    getPos: (state, action) => {
      state.pos = action.payload;
    },
    setPos: (state, action) => {
      state.pos = action.payload; // Update the 'pos' state with the payload
    },
    setPoss: (state, action) => {
      state.poss = action.payload.poss;
    },
    deletePos: (state, action) => {
      state.pos = null;
    },

    getBranch: (state, action) => {
      state.branch = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload.branches;
    },
    deleteBranch: (state, action) => {
      state.branch = null;
    },

    getSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setSuppliers: (state, action) => {
      state.suppliers = action.payload.suppliers;
    },
    deleteSupplier: (state, action) => {
      state.supplier = null;
    }

  }
})

export const { 
  getPos, 
  setPos, 
  setPoss, 
  deletePos,
  getBranch,
  setBranch,
  setBranches,
  deleteBranch,
  getSupplier,
  setSupplier,
  setSuppliers,
  deleteSupplier
} = posSlice.actions;

export default posSlice.reducer;