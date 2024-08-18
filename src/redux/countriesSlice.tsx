import { createSlice } from "@reduxjs/toolkit";
import { СOUNTRIES } from "../utils/countries.ts";

const initialState = {
  countries: СOUNTRIES,
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
