import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import {CustomTabs} from "../commonUI";
import AppointmentTable from "./AppointmentTable";
import RecordModal from "./RecordModal";
import { useDispatch, useSelector } from "react-redux";
import { confirmAppointment, getAppointments } from "../../store/slice/appointmentSlice";

const TABS = [
  { label: "Confirmed" },
  { label: "Pending" }
];

const Appointments = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedRecordAppt, setSelectedRecordAppt] = useState(null);
  const { appointments, status } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  // Fetch appointments based on the tab
  const fetchAppointments = () => {
    dispatch(getAppointments(tabIndex === 0 ? "confirmed" : "pending")); // Dispatch action to fetch appointments
  };

  useEffect(() => {
    fetchAppointments();
  }, [tabIndex, dispatch]);

  const handleConfirm = async (appointmentId) => {
    try {
      dispatch(confirmAppointment(appointmentId))
      dispatch(getAppointments()); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Appointments</Typography>
      <CustomTabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} tabs={TABS} />

      {status ==='loading' ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <AppointmentTable
          appointments={appointments}
          isConfirmedTab={tabIndex === 0}
          onCreateRecord={setSelectedRecordAppt}
          onConfirm={handleConfirm}
        />
      )}

      {selectedRecordAppt && (
        <RecordModal
          appointment={selectedRecordAppt}
          onClose={() => setSelectedRecordAppt(null)}
        />
      )}
    </Container>
  );
};

export default Appointments;
