import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { reviewsApi } from './features/reviews/fetchReviews';
import reviewReducer from './features/reviews/reviews';

export const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsApi.middleware),
});

setupListeners(store.dispatch);
