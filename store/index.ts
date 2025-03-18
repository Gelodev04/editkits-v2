import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from '@/services/api';
import {authApi} from "@/services/api/auth";
import {jobApi} from "@/services/api/job";
import {fileApi} from "@/services/api/file";

export const store = configureStore({
  reducer: {
    // @ts-ignore
    [api.reducerPath]: api.reducer,
    // @ts-ignore
    [authApi.reducerPath]: authApi.reducer,
    // @ts-ignore
    [jobApi.reducerPath]: jobApi.reducer,
    // @ts-ignore
    [fileApi.reducerPath]: fileApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware ) => getDefaultMiddleware().concat(api.middleware, authApi.middleware, jobApi.middleware, fileApi.middleware)
})

setupListeners(store.dispatch)