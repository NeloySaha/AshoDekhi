import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuState: false,
};

const mobileNavSlice = createSlice({
  name: "mobileNav",
  initialState,
  reducers: {
    toggleMenuState(state) {
      state.menuState = !state.menuState;
    },
  },
});

export const { toggleMenuState } = mobileNavSlice.actions;

export default mobileNavSlice.reducer;
