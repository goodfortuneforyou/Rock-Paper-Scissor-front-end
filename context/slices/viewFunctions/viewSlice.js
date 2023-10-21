import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccount: "",
  availableGames: [],
  myCreatedGames: [],
  myJoinedGames: [],
  myComittedGames: [],
  revealedGames: [],
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
    setMyComittedGames: (state, action) => {
      state.myComittedGames = action.payload;
    },
    setRevealedGames: (state, action) => {
      state.revealedGames = action.payload;
    },
  },
});
export const {
  setCurrentAccount,
  setAvailableGames,
  setMyCreatedGames,
  setMyJoinedGames,
  setMyComittedGames,
  setRevealedGames,
} = viewSlice.actions;
export const publicValue = (state) => state.viewFunctions.currentAccount;
export default viewSlice.reducer;
