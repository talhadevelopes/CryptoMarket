import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// CoinRanking API Setup
const coinRankingHeaders = {
  'x-rapidapi-key': import.meta.env.VITE_COINRANKING_API_KEY,
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const coinRankingBaseUrl = 'https://coinranking1.p.rapidapi.com';

// CryptoCompare API Setup
const cryptoCompareHeaders = {
  'Authorization': `Apikey ${import.meta.env.VITE_CRYPTOCOMPARE_API_KEY}`,
};

const cryptoCompareBaseUrl = 'https://min-api.cryptocompare.com';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => ({
        url: `${coinRankingBaseUrl}/coins?limit=${count}`,
        headers: coinRankingHeaders,
      }),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => ({
        url: `${coinRankingBaseUrl}/coin/${coinId}`,
        headers: coinRankingHeaders,
      }),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => ({
        url: `${coinRankingBaseUrl}/coin/${coinId}/history?timePeriod=${timeperiod}`,
        headers: coinRankingHeaders,
      }),
    }),
    getExchanges: builder.query({
      query: () => ({
        url: `${cryptoCompareBaseUrl}/data/exchanges/general`,
        headers: cryptoCompareHeaders,
      }),
    }),
  }),
});

export const { 
  useGetCryptosQuery, 
  useGetCryptoDetailsQuery, 
  useGetCryptoHistoryQuery, 
  useGetExchangesQuery 
} = cryptoApi;

