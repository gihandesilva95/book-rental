import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import { booksApi } from '../features/books/booksApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});