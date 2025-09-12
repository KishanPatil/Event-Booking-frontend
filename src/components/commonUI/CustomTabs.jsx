import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";

export default function CustomTabs({ value, onChange, tabs }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      centered
      sx={{ mb: 3 }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
}

// ✅ PropTypes validation
CustomTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
