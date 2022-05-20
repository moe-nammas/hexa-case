import React from "react";
import "./DashboardField.scss";

const DashboardField = ({ title, stats, color }) => {
  return (
    <div className="dasboard-field-container">
      <div className="lbl-style field-title">{title}</div>
      <div
        className="stats-field"
        style={{ color: stats > 0 ? `${color}` : "#9DF57F" }}
      >
        {stats}
      </div>
    </div>
  );
};

export default DashboardField;
