import { configureStore } from "@reduxjs/toolkit";
import uncontrolledFormDataReducer from "./uncontrolledFormSlice";
import reactHookFormReducer from "./reactHookFormSlice";
import countryReducer from "./countriesSlice";

const store = configureStore({
  reducer: {
    UncontrolledFormData: uncontrolledFormDataReducer,
    ReactHookForm: reactHookFormReducer,
    countries: countryReducer,
  },
});

export default store;
