import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import viewReducer from "./slices/viewFunctions/viewSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    viewFunctions: viewReducer,
  },
});
