import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
  availableGames: [],
  myCreatedGames: [],
  myJoinedGames: [],
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
    setMyCreatedGames: (state, action) => {
      state.myCreatedGames = action.payload;
    },
    setMyJoinedGames: (state, action) => {
      state.myJoinedGames = action.payload;
    },
  },
});
export const {
  setCurrentAccount,
  setAvailableGames,
  setMyCreatedGames,
  setMyJoinedGames,
} = viewSlice.actions;
export const publicValue = (state) => state.viewFunctions.currentAccount;
export default viewSlice.reducer;
