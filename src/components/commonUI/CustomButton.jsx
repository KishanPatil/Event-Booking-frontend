import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CustomButton = ({ label, onClick, variant = "contained", color = "primary", ...props }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
};

export default CustomButton;
