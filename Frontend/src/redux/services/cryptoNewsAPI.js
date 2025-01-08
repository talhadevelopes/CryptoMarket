import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://newsapi.org/v2';
const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Access the API key from the .env file

const createRequest = (url) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/everything?q=${newsCategory}+crypto&sortBy=publishedAt&pageSize=${count}&apiKey=${apiKey}`),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
