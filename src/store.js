import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import reviewReducer from './features/reviews/reviews';
import { replyApi } from './features/reviews/fetchReply';
import { reviewsApi } from './features/reviews/fetchReviews';

export const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsApi.middleware, replyApi.middleware),
});

setupListeners(store.dispatch);
