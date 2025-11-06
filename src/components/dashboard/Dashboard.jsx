// src/components/dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/slice/eventSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Events</h1>
      {list.map((event) => (
        <div key={event._id} className="border p-4 mb-3 rounded shadow-sm">
          <h2 className="text-lg font-semibold">{event.name}</h2>
          <p>{event.date}</p>
          <p>Seats Left: {event.availableTickets}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
