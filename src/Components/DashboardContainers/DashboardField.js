import React from "react";
import "./DashboardField.scss";
import { FiChevronsRight } from "react-icons/fi";
import Loading from "../Loading/Loading";

const DashboardField = ({ title, stats, icon, more = true, isLoading }) => {
  return (
    <div className="dasboard-field-container">
      <div className="field-title">
        {icon} {title}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="stats-field"
          style={{ color: stats > 0 ? "#e62e51" : "#58b84c" }}
        >
          {stats}
        </div>
      )}
      {more && (
        <div className="footer-container">
          <label>More</label>
          <FiChevronsRight />
        </div>
      )}
    </div>
  );
};

export default DashboardField;
