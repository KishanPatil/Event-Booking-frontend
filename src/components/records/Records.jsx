import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography
} from "@mui/material";
import { getRecords } from "../../store/slice/recordSlice";
import RecordDetailModal from "./RecordDetailModal";

const Records = () => {
  const dispatch = useDispatch();
  const { records, status } = useSelector((state) => state.records);

  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  if (status === "loading") return <Typography>Loading records...</Typography>;
  if (!records) return <Typography>No records found.</Typography>;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Medical Records
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Attachments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records?.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.patientName}</TableCell>
                <TableCell>{rec.doctorName}</TableCell>
                <TableCell>{rec.diagnosis}</TableCell>
                <TableCell>{new Date(rec.created_date).toLocaleString() || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedRecord(rec)}
                  >
                    See
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔍 Modal to show details */}
      {selectedRecord && (
        <RecordDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};

export default Records;
