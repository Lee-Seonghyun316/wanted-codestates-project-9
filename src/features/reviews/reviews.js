import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  data: [],
};

function shuffle(array) {
  //Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    deleteData: (state) => {
      state.data = [];
    },
    pageInitialize: (state) => {
      state.page = 1;
    },
    incrementPage: (state, action) => {
      state.page += 1;
    },
    randomSort: (state, action) => {
      state.data = shuffle(state.data);
    },
    addRandomData: (state, action) => {
      // 안되는 이유?
      // state.data = [...state.data, ...shuffle(action.payload)];
      const shuffled = [...action.payload].sort(() => Math.random() - 0.5);
      state.data = [...state.data, ...shuffled];
    },
  },
});

export const { addData, incrementPage, randomSort, addRandomData, deleteData, pageInitialize } = reviewSlice.actions;

export default reviewSlice.reducer;
