import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Toolbar } from "@mui/material";

const NavbarLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navbar />
      
      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Push down below AppBar */}
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default NavbarLayout;
