import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
  availableGames: [],
};

export const viewSlice = createSlice({
  name: "viewFunctions",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
    setAvailableGames: (state, action) => {
      state.availableGames = action.payload;
    },
  },
});
export const { setCurrentAccount, setAvailableGames } = viewSlice.actions;
export const publicValue = (state) => state.viewFunctions.currentAccount;
export default viewSlice.reducer;
