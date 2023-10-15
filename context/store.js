import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import viewReducer from "./slices/viewFunctions/viewSlice";
import writeReducer from "./slices/writeFunctions/writeSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    viewFunctions: viewReducer,
    writeFunctions: writeReducer,
  },
});
