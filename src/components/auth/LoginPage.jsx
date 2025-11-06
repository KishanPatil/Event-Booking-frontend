// src/components/auth/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return toast.error("Please enter your userId");
    const res = await dispatch(loginUser(userId));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid User ID");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
