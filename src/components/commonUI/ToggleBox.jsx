// src/commonUI/ToggleBox.js
import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem } from "@mui/material";

const ToggleBox = ({ anchorEl, open, onClose, items }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {items.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

ToggleBox.propTypes = {
  anchorEl: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.any
  ]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  ).isRequired
};

export default ToggleBox;
