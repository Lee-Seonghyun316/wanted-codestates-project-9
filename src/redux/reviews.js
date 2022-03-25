import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  queryPage: 0,
  data: [],
  queryData: [],
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
    addQueryData: (state, action) => {
      state.queryData = [...state.queryData, ...action.payload];
    },
    deleteData: (state) => {
      state.data = [];
    },
    deleteQueryData: (state) => {
      state.queryData = [];
    },
    pageInitialize: (state) => {
      state.page = 1;
    },
    queryPageInitialize: (state) => {
      state.queryPage = 1;
    },
    incrementPage: (state, action) => {
      state.page += 1;
    },
    incrementQueryPage: (state, action) => {
      state.queryPage += 1;
    },
    randomSort: (state, action) => {
      state.data = shuffle(state.data);
    },
    addRandomData: (state, action) => {
      const newArr = [...action.payload];
      state.data = [...state.data, ...shuffle(newArr)];
    },
  },
});

export const {
  addData,
  addQueryData,
  incrementPage,
  incrementQueryPage,
  randomSort,
  addRandomData,
  deleteData,
  deleteQueryData,
  pageInitialize,
  queryPageInitialize,
} = reviewSlice.actions;

export default reviewSlice.reducer;
