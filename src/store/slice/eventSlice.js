// src/store/slice/eventSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/fetcher";

// ✅ Fetch all events
export const fetchEvents = createAsyncThunk("events/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/events");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch events");
  }
});

// ✅ Fetch single event by ID
export const fetchEventById = createAsyncThunk("events/fetchById", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/events/${id}`);
    return res.data; // backend directly returns event object
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch event");
  }
});

const eventSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    selectedEvent: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // ✅ Fetch by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, { payload }) => {
        state.selectedEvent = payload;
        state.loading = false;
      })
      .addCase(fetchEventById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;
