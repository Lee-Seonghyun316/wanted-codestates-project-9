import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestPage: 1,
  likesPage: 1,
  latestData: [],
  likeOrderData: [],
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addLatestData: (state, action) => {
      state.latestData = [...state.latestData, ...action.payload];
    },
    addLikeOrderData: (state, action) => {
      state.likeOrderData = [...state.likeOrderData, ...action.payload];
    },
    sortByLikes: (state, action) => {
      if (state.likeOrderData.length < state.latestData.length) {
        state.likeOrderData = [...state.latestData];
        state.likeOrderData.sort((a, b) => b.like - a.like);
      }
    },
    incrementPage: (state, action) => {
      action.payload === 'recent' ? (state.latestPage += 1) : (state.likesPage += 1);
    },
  },
});

export const { addLatestData, incrementPage, sortByLikes, addLikeOrderData } = reviewSlice.actions;

export default reviewSlice.reducer;
