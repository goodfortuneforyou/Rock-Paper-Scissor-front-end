import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
};

export const viewSlice = createSlice({
  name: "viewFunctions",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
  },
});
export const { setCurrentAccount } = viewSlice.actions;
export default viewSlice.reducer;
