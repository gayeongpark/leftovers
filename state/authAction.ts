import axios from "axios";
import { Dispatch } from "redux";
import { loginSuccess, logoutSuccess } from "./authSlice";
import { API_URL } from "@env";

// Define a type for the user data
interface UserData {
  email: string;
  id: string;
  // Add other user-related properties here
}

// Define a type for the authentication response
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userData: UserData; // Use the UserData type here
}

export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<AuthResponse>(
        `http://${API_URL}:8000/auth/login`,
        {
          email,
          password,
        }
      );
      if (response && response.data) {
        const { accessToken, refreshToken, userData } = response.data;
        dispatch(loginSuccess({ accessToken, refreshToken, userData }));
        return response.data;
      }
    } catch (error) {
      // Handle login error (e.g., show an error message)
      console.error("Login error:", error);
    }
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    // Optionally, send a request to your server to invalidate tokens

    // Clear tokens and user info from Redux
    dispatch(logoutSuccess());
  } catch (error) {
    // Handle logout error (e.g., show an error message)
    console.error("Logout error:", error);
  }
};
