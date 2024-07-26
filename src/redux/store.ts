import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { stApi } from "../api/starTrekApi";

const store = configureStore({
  reducer: {
    [stApi.reducerPath]: stApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stApi.middleware),
});

setupListeners(store.dispatch);

export default store;
