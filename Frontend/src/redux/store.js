import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from './services/cryptoAPI';
import { cryptoNewsApi } from './services/cryptoNewsAPI';

const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the cryptoApi reducer
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // Add the cryptoNewsApi reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware), // Combine middleware in one statement
});

export default store;
