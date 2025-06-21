import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => ({
        url: 'books',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Book', id })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),
    getBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: 'books/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),
    rentBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}/rent`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Book', id }, 
        { type: 'Book', id: 'LIST' }, 
      ],
    }),
    returnBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}/return`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Book', id },
        { type: 'Book', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useRentBookMutation,
  useReturnBookMutation,
} = booksApi;
