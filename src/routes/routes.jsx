import { Routes, Route } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import NavbarLayout from "../components/navbar/NavbarLayout";
import Doctors from "../components/doctors/Doctor";
import Records from "../components/records/Records";
import Appointments from "../components/appointments/Appointments";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private Routes with Navbar */}
      <Route element={<PrivateRoute />}>
        <Route element={<NavbarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/record" element= {<Records/>}/>
          <Route path="/appointment" element = {<Appointments/>}/>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
