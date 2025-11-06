import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/slice/eventSlice";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const dispatch = useDispatch();
  const { list: events, loading } = useSelector((state) => state.events);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ mt: 5, ml: 5 }} />;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Events
      </Typography>

      {events.length === 0 ? (
        <Typography>No events available.</Typography>
      ) : (
        events.map((event) => (
          <Card key={event._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description || "No description provided."}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/events/${event._id}`)}
              >
                Join Event
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Events;
