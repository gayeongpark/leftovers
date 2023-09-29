import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

let jwt_decode = require("jwt-decode");

type KeysType = {
  accessToken: string;
  refreshToken: string;
  userData: any;
};

export async function getAccessUsingRefresh(refreshToken: string) {
  try {
    const response = await axios.post(`http://${API_URL}:8000/auth/login`, {
      refreshToken,
    });

    return response.data;
  } catch (error) {
    // Handle the error here, e.g., by logging or returning null
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export async function getVerifiedKeys(keys: KeysType) {
  console.log("Loading keys from storage");

  if (keys) {
    console.log("Checking access");

    if (!isTokenExpired(keys.accessToken)) {
      console.log("Returning access");

      return keys;
    } else {
      console.log("Access token expired");

      console.log("Checking refresh token expiry");

      if (!isTokenExpired(keys.refreshToken)) {
        console.log("Fetching access using refresh token");

        const response = await getAccessUsingRefresh(keys.refreshToken);

        if (response) {
          await AsyncStorage.setItem("keys", JSON.stringify(response));
          console.log("Updated credentials");
          return response;
        } else {
          console.log("Failed to refresh access token");
          return null;
        }
      } else {
        console.log("Refresh token expired, please log in");
        return null;
      }
    }
  } else {
    console.log("Access not available, please log in");
    return null;
  }
}

export async function setCredentials(keys: KeysType) {
  try {
    await AsyncStorage.setItem("keys", JSON.stringify(keys));
  } catch (error) {
    // Handle the error here, e.g., by logging or displaying an error message
    console.error("Error setting credentials:", error);
  }
}

export async function getCredentials() {
  try {
    const credentials = await AsyncStorage.getItem("keys");

    if (credentials != null) {
      return JSON.parse(credentials);
    } else {
      return null;
    }
  } catch (error) {
    // Handle the error here, e.g., by logging or displaying an error message
    console.error("Error getting credentials:", error);
  }
  return null;
}

export function isTokenExpired(token: string) {
  const decoded = jwt_decode(token);

  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
