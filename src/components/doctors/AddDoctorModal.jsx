// src/components/doctors/AddDoctorModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addDoctor, fetchFailure, getDoctors } from "../../store/slice/doctorSlice";
import { CustomButton } from "../commonUI";
import { toast } from "react-toastify";

const AddDoctorModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "",
    location: "",
    bio: "",
    profile_picture: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profile_picture: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      dispatch(addDoctor(data));
      dispatch(getDoctors());
      toast.success("Doctor added successfully!");

      onClose();
    } catch (error) {
      dispatch(fetchFailure(error?.message || "Failed to add doctor"));
      alert("Failed to add doctor");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Doctor</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField label="Specialty" name="specialty" value={form.specialty} onChange={handleChange} />
          <TextField label="Location" name="location" value={form.location} onChange={handleChange} />
          <TextField
            label="Bio"
            name="bio"
            multiline
            rows={3}
            value={form.bio}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {form.profile_picture && <p>Selected: {form.profile_picture.name}</p>}
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Cancel" onClick={onClose} variant="outlined" color="secondary" />
        <CustomButton label="Save" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctorModal;
