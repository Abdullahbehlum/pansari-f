import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: [],
    userRole:[],
  },
  reducers: {
    LoginReducer: (state, { payload }) => {
      const { token } = payload;
      state.token = token;
      state.isAuthenticated = true;
    },
    LogoutReducer: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { LoginReducer, LogoutReducer } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
