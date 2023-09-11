import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pos: null,
  branch: null,
  poss: [],
  branches: [],
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
} = posSlice.actions;

export default posSlice.reducer;