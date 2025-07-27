import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userDetails";
import { loginSlice } from "./slice/loginSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    userDetails: userSlice.reducer,
    loginDetails: loginSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
