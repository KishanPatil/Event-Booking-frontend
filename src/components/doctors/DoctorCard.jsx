import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";

export default function DoctorCard({ doctor, onView, onBook }) {
  // Convert buffer → base64 string
  const profilePic = doctor.profile_picture?.data
    ? `data:image/jpeg;base64,${btoa(
        String.fromCharCode(...doctor.profile_picture.data)
      )}`
    : null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar
            src={profilePic}
            sx={{ width: 56, height: 56 }}
            alt={doctor.name}
          />
          <div>
            <Typography variant="h6">{doctor.name}</Typography>
            <Typography variant="body2">
              {doctor.specialty} · {doctor.location}
            </Typography>
          </div>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onView(doctor)}>
          View
        </Button>
        <Button size="small" variant="contained" onClick={() => onBook(doctor)}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}
