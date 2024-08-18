import { createSlice } from "@reduxjs/toolkit";

const initialState: FormData[] = [];

export const lastFormSubmittedSlive = createSlice({
  name: "lastFormSubmitted",
  initialState,
  reducers: {
    addLastFormSubmittedData: (state: FormData[], action) => {
      const formData = action.payload;
      state = state.splice(0, 1, formData);
    },
  },
});

export const { addLastFormSubmittedData } = lastFormSubmittedSlive.actions;
export default lastFormSubmittedSlive.reducer;