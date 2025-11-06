// src/store/slice/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/fetcher";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", { email });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuthenticated", "true");
      return res.data; // includes token + role
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const initializeUserRole = createAsyncThunk("auth/init", async () => {
  const token = localStorage.getItem("token");
  if (!token) return { isAuthenticated: false };
  // Optionally decode or call backend for role
  return { isAuthenticated: true, token };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.role = payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(initializeUserRole.fulfilled, (state, { payload }) => {
        state.isAuthenticated = payload.isAuthenticated;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
