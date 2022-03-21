import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  data: [],
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { addData, incrementPage } = reviewSlice.actions;

export default reviewSlice.reducer;
