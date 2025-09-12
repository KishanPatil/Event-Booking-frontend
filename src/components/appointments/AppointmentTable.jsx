// src/components/AppointmentTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button
} from "@mui/material";

const AppointmentTable = ({ appointments, isConfirmedTab, onCreateRecord, onConfirm }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Doctor ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id}>
              <TableCell>{appt.patientId}</TableCell>
              <TableCell>{appt.doctorId}</TableCell>
              <TableCell>{appt.date}</TableCell>
              <TableCell>{appt.time}</TableCell>
              <TableCell>{appt.status}</TableCell>
              <TableCell>{appt.notes}</TableCell>
              <TableCell>
                {isConfirmedTab ? (
                  <Button variant="outlined" size="small" onClick={() => onCreateRecord(appt)}>
                    Create Record
                  </Button>
                ) : (
                  <Button variant="contained" size="small" onClick={() => onConfirm(appt.id)}>
                    Confirm
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTable;
