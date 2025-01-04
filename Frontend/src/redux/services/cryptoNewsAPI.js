import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://newsapi.org/v2';
const apiKey = '5f2f0ea4670a41858e320de2d2a70f1d';

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
