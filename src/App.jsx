import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { AuthProvider } from "./components/auth/AuthProvider";
import { useDispatch } from "react-redux";
import { initializeUserRole } from "./store/slice/authSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserRole());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
