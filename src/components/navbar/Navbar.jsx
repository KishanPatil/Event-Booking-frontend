import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../auth/useAuth";
import Header from "./Header";
import Sidebar from "./Sidebar";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: true });
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          handleLogout={handleLogout}
        />
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
}
