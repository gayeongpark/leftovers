import axios from "axios";
import { Dispatch } from "redux";
import { loginSuccess, logoutSuccess } from "./authSlice";
import { API_URL, API_URL2 } from "@env";

interface UserData {
  email: string;
  id: string;
  firstname: string;
  lastname: string; 
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userData: UserData;
  error: string;
}

export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      let apiUrlToUse = API_URL;

      if (API_URL2 && API_URL2.trim() !== "") {
        apiUrlToUse = API_URL2;
      }
      const response = await axios.post<AuthResponse>(
        `http://${apiUrlToUse}:8000/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        const { accessToken, refreshToken, userData } = response.data;
        dispatch(loginSuccess({ accessToken, refreshToken, userData }));
        return response.data;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    let apiUrlToUse = API_URL;

    if (API_URL2 && API_URL2.trim() !== "") {
      apiUrlToUse = API_URL2;
    }
    const response = await axios.post(
      `http://${apiUrlToUse}:8000/auth/logout`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      dispatch(logoutSuccess());
    } else {
      console.error("Logout failed. Server response:", response);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};
