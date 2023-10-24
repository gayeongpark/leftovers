import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Redux and redux toolkit are popular libraries for managing state using JavaScript.
//These libraryies allow me to track changes to state and debug application.
//However the main reason why I choose to redux is that these allow me to pass props all related components by creating store, slices and action.
//It is really comfortable because I do not need to pass props every time when I need that props value to the different component.
//Redux Toolkit is a newer library of redux team that is designed to make Redux easier to use and more concise.
//That is why I used the redux toolkit in this project.

interface UserData {
  email: string;
  id: string;
  firstname: string;
  lastname: string;
}

//The reason why I did use '|' is that, in TypeScript, '|' (union type) is typically used to declare a type that can have multiple possible types (type unions).
interface AuthState {
  isAuthenticated: boolean;
  userData: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
}

//I set the initalState, which is the state when user did not attempt to login.
//Initially, when the user is not authenticated/successfully logged in, then user data, access token, and refresh token are all set to null (not athenticated).
const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth", //This is the name of createSlice.
  initialState, // I already declared the initialState above.
  reducers: {
    //This is part is to assign types to the action. That means that if the action.type is loginSuccess in authAction.ts, this function will be executed.
    //This functions are used to update the state.
    loginSuccess: (
      //It takes two arguments: state and action.
      //The state argument represents the current state, and the action argument represents the action object that triggered this reducer.
      state,
      action: PayloadAction<{
        //PayloadAction is to define the structure of action objects in Redux.
        //Using PayloadAction with TypeScript provides type checking and helps ensure that actions are dispatched and handled correctly.
        accessToken: string;
        refreshToken: string;
        userData: UserData;
      }>
    ) => {
      state.isAuthenticated = true;
      //payload contains data or information related to the action.
      //In this case, the payload includes accessToken, refreshToken, and userData.
      //When this action is dispatched, it carries these pieces of information, allowing reducers to update the state based on this data.
      //The use of a payload makes actions more flexible and allows me to pass various data to reducers.
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
