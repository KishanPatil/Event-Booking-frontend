import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const RecordDetailModal = ({ record, onClose }) => {
  const hasAttachment = !!record.attachments;

  return (
    <Dialog open={!!record} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Record Details</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle1"><strong>Patient Name:</strong> {record.patientName}</Typography>
          <Typography variant="subtitle1"><strong>Doctor Name:</strong> {record.doctorName}</Typography>
          <Typography variant="subtitle1"><strong>Diagnosis:</strong> {record.diagnosis}</Typography>
          <Typography variant="subtitle1"><strong>Date:</strong> {new Date(record.created_date).toLocaleString()}</Typography>
        </Box>

        {/* 🖼️ Show image if attachment exists */}
        {hasAttachment ? (
          <Box>
            <Typography variant="subtitle1"><strong>Attachment:</strong></Typography>
            <Box
              component="img"
              src={record.attachments}
              alt="Medical Attachment"
              sx={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 2 }}
            />
          </Box>
        ) : (
          <Typography color="text.secondary">No attachment available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordDetailModal;
