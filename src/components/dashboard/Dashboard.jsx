// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {  name } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome</h2>
      <p> {name}</p>
    </div>
  );
};

export default Dashboard;
