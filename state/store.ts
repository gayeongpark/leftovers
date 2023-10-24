import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // This is authSlice.reducer. As it is defualt export, authReduce === authSlice.reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

//This is the type of the entire Redux store's state. This type provides type checking when accessing the state
export type RootState = ReturnType<typeof store.getState>;
// This is the type of the dispatch function for the store.
export type AppDispatch = typeof store.dispatch;
