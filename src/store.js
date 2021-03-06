import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import reviewReducer from './redux/reviews';
import { replyApi } from './redux/fetchReply';
import { reviewsApi } from './redux/fetchReviews';

export const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsApi.middleware, replyApi.middleware),
});

setupListeners(store.dispatch);
