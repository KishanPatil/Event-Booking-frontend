import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import appointmentReducer from "./slice/appointmentSlice";
import doctorReducer from "./slice/doctorSlice";
import recordReducer from './slice/recordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    records: recordReducer,
  },
});
