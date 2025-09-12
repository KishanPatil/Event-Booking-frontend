import React, { useEffect } from "react";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleBox from "../commonUI/ToggleBox";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slice/authSlice";

export default function Header({
  open,
  handleDrawerOpen,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  handleLogout,
}) {

  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userName = name || "Guest";

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
      {/* Left side - Drawer toggle + App Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Innobot Healthcare
        </Typography>
      </Box>

      {/* Right side - Name + Avatar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1">{userName}</Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar src="/profile.jpg" alt="Profile" />
        </IconButton>
      </Box>

      {/* Dropdown (ToggleBox) */}
      <ToggleBox
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        items={[{ label: "Logout", onClick: handleLogout }]}
      />
    </Box>
  );
}
