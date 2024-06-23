import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("authStatus")) || false,
  signedPerson: JSON.parse(localStorage.getItem("signedInPerson")) || {},
  signModalState: false,
  loginModalState: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.signedPerson = action.payload;

      localStorage.setItem("signedInPerson", JSON.stringify(action.payload));
      localStorage.setItem("authStatus", true);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.signedPerson = {};

      localStorage.removeItem("signedInPerson");
      localStorage.removeItem("authStatus");
    },

    showSignModal(state) {
      state.signModalState = true;
    },

    showLoginModal(state) {
      state.loginModalState = true;
    },

    hideSignModal(state) {
      state.signModalState = false;
    },

    hideLoginModal(state) {
      state.loginModalState = false;
    },
  },
});

export const {
  login,
  logout,
  showSignModal,
  showLoginModal,
  hideLoginModal,
  hideSignModal,
} = authSlice.actions;

export default authSlice.reducer;
