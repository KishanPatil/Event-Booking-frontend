import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        textAlign: "center",
        bgcolor: "grey.200",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Innobot Healthcare. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
