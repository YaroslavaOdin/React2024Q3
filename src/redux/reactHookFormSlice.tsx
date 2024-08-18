import { createSlice } from "@reduxjs/toolkit";

const initialState: FormData[] = [];

export const ReactHookFormDataSlice = createSlice({
  name: "ReactHookFormData",
  initialState,
  reducers: {
    addReactHookFormData: (state: FormData[], action) => {
      console.log(action);
      const formData = action.payload;
      state.push(formData);
    },
  },
});

export const { addReactHookFormData } = ReactHookFormDataSlice.actions;
export default ReactHookFormDataSlice.reducer;
