import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // This is authSlice.reducer. As it is defualt export, authReduce === authSlice.reducer
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

// This is the type of the entire Redux store's state.
// This type provides type checking when accessing the state
export type RootState = ReturnType<typeof store.getState>;
// This is the type of the dispatch function for the store.
export type AppDispatch = typeof store.dispatch;
