import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
};

export const writeSlice = createSlice({
  name: "writeFunctions",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      return {
        ...state,
        currentAccount: action.payload,
      };
    },
  },
});
export const { setCurrentAccount } = writeSlice.actions;
// export const publicValue = (state) => state.viewFunctions.currentAccount;
export default writeSlice.reducer;
