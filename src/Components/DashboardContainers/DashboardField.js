import React from "react";
import "./DashboardField.scss";
import { FiChevronsRight } from "react-icons/fi";

const DashboardField = ({ title, stats, icon }) => {
  return (
    <div className="dasboard-field-container">
      <div className="field-title">
        {title} {icon}
      </div>
      <div
        className="stats-field"
        style={{ color: stats > 0 ? "#e62e51" : "#58b84c" }}
      >
        {stats}
      </div>
      <div className="footer-container">
        <label>More</label>
        <FiChevronsRight />
      </div>
    </div>
  );
};

export default DashboardField;
