import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [
    "Belarus",
    "Latvia",
    "Lithuania",
    "Ukraine",
    "Poland",
    "France",
    "Germany",
    "China",
    "Japan",
    "USA",
  ],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    countries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { countries } = countriesSlice.actions;
export default countriesSlice.reducer;