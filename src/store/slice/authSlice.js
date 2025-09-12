import { createSlice } from "@reduxjs/toolkit";
import { fetcherGet, fetcherPost } from "../../utils/fetcher";
import { APIS } from "../../utils/apiConstant";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  role: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload?.data?.user;
      state.token = action.payload?.data?.token;

      // Decode token and set role directly
      const decoded = jwtDecode(action.payload?.data?.token);
      state.role = decoded?.role;

      localStorage.setItem("token", action.payload?.data?.token);
      localStorage.setItem("isAuthenticated", true);
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.role = null;
      localStorage.removeItem("token");
    },

    setUserRole: (state, action) => {
      if (!state.user) state.user = {};
      state.user.role = action.payload;
    },
    setUserId: (state, action) => {
      if (!state.user) state.user = {};
      state.user.id = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export all required actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUserRole,
  setUserId,
  setRole, 
  setUserName,
  setError
} = authSlice.actions;

// Thunk: Login
export const loginUser = (payload) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { email, password } = payload;
    const response = await fetcherPost(APIS.LOGIN, { email, password });
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFailure(error?.message || "Login failed"));
  }
};

// Thunk: Register
export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const response = await fetcherPost(APIS.REGISTER, userData);

    // Check the response status
    if (response?.success) {

      dispatch(setUserName(response?.data?.user?.name));

      const token  = response?.data?.token;
      if (token) {
        // Store the token in localStorage and set user as authenticated
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");

        // Decode token to set role
        const decoded = jwtDecode(token);
        dispatch(setUserRole(decoded?.role));
        dispatch(setUserId(decoded?.id));
        dispatch(setRole(decoded?.role)); // Flattened state.role
      }
      dispatch(loginSuccess(response));
    } else {
      throw new Error(response?.message || "Registration failed");
    }
  } catch (error) {
    dispatch(loginFailure(error?.message || "Registration failed"));
  }
};

export const initializeUserRole = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);

      const role = decoded?.role;
      const id = decoded?.id;
      const exp = decoded?.exp;
      const currentTime = Date.now() / 1000;

      if (exp && exp < currentTime) {
        localStorage.removeItem("token");
        dispatch(logout());
      } else if (role && id) {
        dispatch(setUserRole(role));
        dispatch(setUserId(id));
        dispatch(setRole(role)); 
      } else {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetcherGet(APIS.USER_PROFILE);
    const userName = response?.data?.name;
    if (userName) {
      dispatch(setUserName(userName));
    }
    dispatch(loginSuccess(response));    
  } catch (error) {
    dispatch(loginFailure(error?.message || "Login failed"));
  }
};

export const handleLogout = async (dispatch) => {
  try {
    await localStorage.removeItem("token");
    await localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    dispatch(setError(null));
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export default authSlice.reducer;
