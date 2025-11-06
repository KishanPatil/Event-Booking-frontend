import React, { createContext,  useState } from "react";
import { useDispatch } from "react-redux";  // Ensure it's within Provider context
import { loginUser, logout  } from "../../store/slice/authSlice";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();  // Use it after wrapping with Provider
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async (payload) => {
    try {
      console.log("Attempting login with payload:", payload);
      await dispatch(loginUser(payload));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
