import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  data: [],
};

const shuffle = (array) => {
  //Fisher-Yates shuffle
  for (let index = array.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    incrementPage: (state, action) => {
      state.page += 1;
    },
    randomSort: (state, action) => {
      shuffle(state.data);
    },
    addRandomData: (state, action) => {
      state.data = [...state.data, ...shuffle(action.payload)];
    },
  },
});

export const { addData, incrementPage, randomSort, addRandomData } = reviewSlice.actions;

export default reviewSlice.reducer;
