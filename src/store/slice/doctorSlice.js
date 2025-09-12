import { createSlice } from "@reduxjs/toolkit";
import { fetcherGet, fetcherPost } from "../../utils/fetcher";
import { APIS } from "../../utils/apiConstant";

const initialState = {
  doctors: [],
  status: "idle",
  error: null,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      // 🛠 Convert buffer → base64 string
      state.doctors = action.payload.map((doc) => ({
        ...doc,
        profile_picture: doc.profile_picture?.data
          ? `data:image/jpeg;base64,${btoa(
              new Uint8Array(doc.profile_picture.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), "")
            )}`
          : null,
      }));
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addSuccess: (state, action) => {
      state.doctors.push(action.payload);
    },
    resetDoctors: (state) => {
      state.doctors = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

// ✅ Actions
export const { fetchStart, fetchSuccess, fetchFailure, addSuccess, resetDoctors } =
  doctorSlice.actions;

export const getDoctors = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherGet(APIS.DOCTORS);
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to fetch doctors"));
  }
};

export const addDoctor = (doctorData) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherPost(APIS.DOCTORS, doctorData);
    dispatch(addSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to add doctor"));
  }
};

export const bookDoctor = (bookData) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherPost(APIS.APPOINTMENTS, bookData);
    dispatch(addSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to add doctor"));
  }
};

export const clearDoctors = () => (dispatch) => {
  dispatch(resetDoctors());
};

export default doctorSlice.reducer;
