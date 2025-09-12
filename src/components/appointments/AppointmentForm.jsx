import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Paper, TextField, Button, MenuItem, Box } from "@mui/material";
import dayjs from "dayjs";
import { bookAppointment } from "../../store/slice/appointmentSlice";
import { Alert } from "@mui/material";

export default function AppointmentForm({ doctorId }) {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { doctorId, date, time, notes };
    try {
      await dispatch(bookAppointment(appointmentData)); 
      setError(null);
    } catch (err) {
      console.log("Booking error:", err);
      setError(err.message || "Failed to book appointment");
    }
  };
  

  // simple time options every 30 min 10:00 - 18:00 remove 13:00 -14:00
  const times = [];
  for (let h = 10; h < 18; h++) {
    if (h === 13) continue;
    times.push(`${String(h).padStart(2,"0")}:00`);
    times.push(`${String(h).padStart(2,"0")}:30`);
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField label="Date" type="date" value={date} onChange={e=>setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField label="Time" select value={time} onChange={e=>setTime(e.target.value)}>
            {times.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        </Box>
        <TextField label="Notes" fullWidth multiline rows={3} sx={{ mt:2 }} value={notes} onChange={e=>setNotes(e.target.value)} />
        <Button type="submit" variant="contained" sx={{ mt:2 }}>Book Appointment</Button>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
}
