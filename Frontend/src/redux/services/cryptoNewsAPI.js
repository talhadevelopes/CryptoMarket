import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsapi.org/v2',
    prepareHeaders: (headers) => {
      // Debug console log (remove in production)
      console.log('API Key:', import.meta.env.VITE_NEWS_API_KEY);
      
      headers.set('X-Api-Key', import.meta.env.VITE_NEWS_API_KEY);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) => ({
        url: `/everything?q=${newsCategory}+crypto&sortBy=publishedAt&pageSize=${count}`,
        method: 'GET'
      }),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;