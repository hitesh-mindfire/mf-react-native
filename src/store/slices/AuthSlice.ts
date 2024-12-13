import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setISAuthenticated: (state, { payload }: { payload: boolean }) => {
      state.isAuthenticated = payload;
    },
  },
});

export const { setISAuthenticated } = authSlice.actions;
export default authSlice.reducer;
