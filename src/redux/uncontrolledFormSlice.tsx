import { createSlice } from "@reduxjs/toolkit";
import { FormData } from "../utils/model";

const initialState: FormData[] = [];

export const UncontrolledFormDataSlice = createSlice({
  name: "UncontrolledFormData",
  initialState,
  reducers: {
    addUncontrolledFormData: (state: FormData[], action) => {
      const formData = action.payload;
      state.push(formData);
    },
  },
});

export const { addUncontrolledFormData } = UncontrolledFormDataSlice.actions;
export default UncontrolledFormDataSlice.reducer;
