import { configureStore } from "@reduxjs/toolkit";
import { selectedItemsReducer } from "./reducer";

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
