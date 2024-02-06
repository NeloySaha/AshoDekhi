import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  location: "",
  name: "",
};

const locationSlice = createSlice({
  name: "currentLocation",
  initialState,
  reducers: {
    selectLocation(state, action) {
      const { id, location, name } = action.payload;
      state.id = id;
      state.location = location;
      state.name = name;
    },
  },
});

export const { selectLocation } = locationSlice.actions;

export default locationSlice.reducer;
