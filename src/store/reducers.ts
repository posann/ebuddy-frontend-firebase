import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  uid: string;
  accessToken: string;
}

const initialState: AuthState = {
  email: "",
  accessToken: "",
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
    clearAuth() {
      return initialState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
