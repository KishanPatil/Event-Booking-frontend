import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { registerUser } from "../../store/slice/authSlice"; 
import { CustomTabs } from "../commonUI";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AuthPage() {
  const dispatch = useDispatch();
  const { status,error } = useSelector((state) => state.auth);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [tab, setTab] = useState(0); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect after login success
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  // Handle form submit (Login or Register)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password, confirmPassword, name } = formData;

    try{
      if (!email || !password || (tab === 1 && (!confirmPassword || !name))) {
        alert("Please fill in all fields");
        return;
      }
  
      if (tab === 1 && password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      const userData = { email, password, name };
      if (tab === 0) {
        login({ email, password });
      } else {
        dispatch(registerUser(userData)); // Dispatch registerUser action
      }
      // setError(null)
    }catch(err){
      console.log(err)
      // setError(err.message || "An error occurred" )
    }
    
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        {/* Using reusable Tabs */}
        <CustomTabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          tabs={[{ label: "Login" }, { label: "Register" }]}
        />

        <Typography variant="h5" align="center" gutterBottom>
          {tab === 0 ? "Login to Your Account" : "Create a New Account"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            fullWidth
          />
          {tab === 1 && (
            <>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Processing..."
              : tab === 0
              ? "Login"
              : "Register"}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
}
