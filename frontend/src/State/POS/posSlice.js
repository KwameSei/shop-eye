import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pos: null,
  poss: [],
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
    // 
    setPos: (state, action) => {
      state.pos = action.payload; // Update the 'pos' state with the payload
    },
    setPoss: (state, action) => {
      state.poss = action.payload.poss;
    },
    deletePos: (state, action) => {
      state.pos = null;
    }
  }
})

export const { getPos, setPos, setPoss, deletePos } = posSlice.actions;

export default posSlice.reducer;