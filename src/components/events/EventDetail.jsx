import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../../store/slice/eventSlice";
import axios from "axios";
import { socket } from "../../socket";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  LinearProgress,
} from "@mui/material";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedEvent: event, loading } = useSelector((state) => state.events);
  const [reserving, setReserving] = useState(false);
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ✅ Fetch event details from store
  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [id, dispatch]);

  // ✅ Real-time updates
  useEffect(() => {
    socket.emit("joinEvent", id);
    socket.on("availability", (data) => {
      if (data._id === id) {
        dispatch({
          type: "events/updateAvailability",
          payload: data.availableTickets,
        });
      }
    });
    return () => socket.off("availability");
  }, [id, dispatch]);

  // ✅ Reserve + Confirm booking
  const handleReserve = async () => {
    if (!token) {
      alert("Please login to book your seat!");
      navigate("/login");
      return;
    }

    setReserving(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/events/${id}/reserve`,
        {},
        axiosConfig
      );

      const { ticketId } = data;
      const confirm = await axios.post(
        `http://localhost:4000/api/events/confirm`,
        { ticketId },
        axiosConfig
      );

      if (confirm.data.ticket) {
        alert("✅ Booking Confirmed Successfully!");
        navigate("/events");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert(error.response?.data?.message || "Reservation failed!");
    } finally {
      setReserving(false);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5, ml: 5 }} />;
  if (!event) return <Typography>No event found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{event.name}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {event.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Date: {new Date(event.date).toLocaleDateString()}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Available Tickets:</strong> {event.availableTickets}
          </Typography>

          <Box sx={{ mt: 1, mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={
                ((event.totalTickets - event.availableTickets) / event.totalTickets) *
                100
              }
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            disabled={event.availableTickets <= 0 || reserving}
            sx={{ mt: 3 }}
            onClick={handleReserve}
          >
            {reserving ? "Reserving..." : "Reserve Now"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetail;
