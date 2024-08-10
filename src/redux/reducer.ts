"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Character } from "../utils/model";

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: {
    selectedItems: [] as Character[],
  },
  reducers: {
    selectItem: (state, action) => {
      const item = action.payload as Character;
      state.selectedItems.push(item);
    },
    unselectItem: (state, action) => {
      const unselectItem = action.payload as Character;
      const index = state.selectedItems.findIndex(
        (item: Character) => unselectItem.uid === item.uid,
      );
      state.selectedItems.splice(index, 1);
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  selectedItemsSlice.actions;
export const selectedItemsReducer = selectedItemsSlice.reducer;
