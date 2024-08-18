import { configureStore } from "@reduxjs/toolkit";
import uncontrolledFormDataReducer from "./uncontrolledFormSlice";
import reactHookFormReducer from "./reactHookFormSlice";
import countryReducer from "./countriesSlice";
import lastFormSubmittedReducer from './lastFormSubmittedSlive';

const store = configureStore({
  reducer: {
    UncontrolledFormData: uncontrolledFormDataReducer,
    ReactHookFormData: reactHookFormReducer,
    countries: countryReducer,
    lastFormSubmitted: lastFormSubmittedReducer,
  },
});

export default store;
