import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://newsapi.org/v2';
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const createRequest = (url) => {
  console.log('API Request URL:', url); // Debugging log
  return { 
    url, 
    headers: {
      'User-Agent': 'YourAppName/1.0' // Sometimes helps with API restrictions
    }
  };
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${apiKey}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) => {
        const queryUrl = `/everything?q=${newsCategory}+crypto&sortBy=publishedAt&pageSize=${count}&apiKey=${apiKey}`;
        console.log('Full API Query:', queryUrl); // Debugging log
        return createRequest(queryUrl);
      },
      transformErrorResponse: (response, meta) => {
        console.error('Full API Error:', response, meta);
        return response;
      }
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;