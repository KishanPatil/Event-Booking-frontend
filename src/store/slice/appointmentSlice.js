import { createSlice } from "@reduxjs/toolkit";
import { fetcherGet, fetcherPost } from "../../utils/fetcher";
import { APIS } from "../../utils/apiConstant";

const initialState = {
  appointments: [],
  status: "idle",
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.appointments = action.payload;
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addSuccess: (state, action) => {
      state.appointments.push(action.payload);
    },
    resetAppointments: (state) => {
      state.appointments = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

// ✅ Actions
export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addSuccess,
  resetAppointments,
} = appointmentSlice.actions;


// Thunk: Book a new appointment
export const bookAppointment = (appointmentData) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherPost(APIS.APPOINTMENTS, appointmentData);
    dispatch(addSuccess(response.data));
  } catch (error) {
    console.log("Booking error in slice:", error);
    throw error;
  }
};

// Thunk: Get appointments by status
export const getAppointments = (status) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherGet(`${APIS.APPOINTMENTS}?status=${status}`);
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to fetch appointments"));
  }
};

export const confirmAppointment = (appointmentId) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherPost(APIS.CONFIRM_APPOINTMENT, { appointmentId });
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to confirm appointment"));
  }
}

// ✅ Reset (useful on logout or clearing state)
export const clearAppointments = () => (dispatch) => {
  dispatch(resetAppointments());
};

export default appointmentSlice.reducer;
