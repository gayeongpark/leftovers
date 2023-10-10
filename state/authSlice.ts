import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  email: string;
  id: string;
  firstname: string;
  lastname: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userData: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userData: UserData;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
