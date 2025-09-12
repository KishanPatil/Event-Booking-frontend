import { createSlice } from "@reduxjs/toolkit";
import { fetcherGet, fetcherPost } from "../../utils/fetcher";
import { APIS } from "../../utils/apiConstant";

const initialState = {
  records: [],
  status: "idle",
  error: null,
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.records = action.payload;
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addSuccess: (state, action) => {
      state.records.push(action.payload);
    },
    resetRecords: (state) => {
      state.records = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, addSuccess, resetRecords } =
  recordSlice.actions;


export const getRecords = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherGet(APIS.RECORDS);
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to fetch records"));
  }
};


export const addRecord = (recordData) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetcherPost(APIS.RECORDS, recordData);
    dispatch(addSuccess(response.data));
  } catch (error) {
    dispatch(fetchFailure(error?.message || "Failed to add record"));
  }
};


export const clearRecords = () => (dispatch) => {
  dispatch(resetRecords());
};

export default recordSlice.reducer;
