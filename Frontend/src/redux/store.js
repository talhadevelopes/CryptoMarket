import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from './services/cryptoAPI';

const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the cryptoApi reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware), // Add middleware for RTK Query
});

export default store;
