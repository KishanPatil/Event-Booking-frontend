import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import eventReducer from "./slice/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});
