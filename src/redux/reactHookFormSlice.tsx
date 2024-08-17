import { createSlice } from "@reduxjs/toolkit";

const initialState: FormData[] = [];

export const ReactHookFormDataSlice = createSlice({
  name: "ReactHookFormData",
  initialState,
  reducers: {
    addUncontrolledFormData: (state: FormData[], action) => {
        const formData = action.payload;
        state.push(formData);
      },
  },
});

export const { addUncontrolledFormData } = ReactHookFormDataSlice.actions;
export default ReactHookFormDataSlice.reducer;