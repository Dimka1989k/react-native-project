import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";

const state = {
  userId: null,
  login: null,
  stateChange: false,
  email: null,
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    login: payload.login,
    email: payload.email,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => state,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: actions,
});

// console.log('authSlice', authSlice);
