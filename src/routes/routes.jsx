import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";

//  Lazy-loaded components
const LoginPage = lazy(() => import("../components/auth/LoginPage"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const NavbarLayout = lazy(() => import("../components/navbar/NavbarLayout"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const Events = lazy(() => import("../components/events/Events"));

const AppRoutes = () => {
  return (
    // Suspense shows fallback until lazy component loads
    <Suspense fallback={<h3 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h3>}>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes with Navbar */}
        <Route element={<PrivateRoute />}>
          <Route element={<NavbarLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
