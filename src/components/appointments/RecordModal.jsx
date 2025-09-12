// src/components/RecordModal.jsx
import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addRecord } from "../../store/slice/recordSlice"; // ✅ Adjust path if needed

const RecordModal = ({ appointment, onClose }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [attachment, setAttachment] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("patientId", appointment.patientId);
    formData.append("doctorId", appointment.doctorId);
    formData.append("appointmentId", appointment.id);
    formData.append("diagnosis", diagnosis);
    formData.append("prescription", prescription);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      await dispatch(addRecord(formData)); // ✅ Redux thunk handles this
      alert("Record created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating record.");
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Create Medical Record</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Appointment ID: {appointment.id}</Typography>

        <TextField
          label="Diagnosis"
          fullWidth
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Prescription"
          fullWidth
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Attachment
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {attachment && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {attachment.name}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordModal;
