import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://gnews.io/api/v4',
  }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) => ({
        // Gnews API format
        url: `/search?q=${newsCategory}+crypto&token=${import.meta.env.VITE_NEWS_API_KEY}&max=${count}&lang=en`,
        method: 'GET'
      }),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;