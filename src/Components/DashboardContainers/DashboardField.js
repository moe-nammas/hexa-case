import React from "react";
import "./DashboardField.scss";
import { FiChevronsRight } from "react-icons/fi";
import Loading from "../Loading/Loading";

const DashboardField = ({
  title,
  stats,
  icon,
  more = true,
  isLoading,
  func,
}) => {
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
          style={{
            color:
              stats === 0
                ? "#58b84c"
                : stats > 0 && stats <= 50
                ? "#efa81b"
                : "#E62E51",
          }}
        >
          {stats}
        </div>
      )}
      {more && (
        <div className="footer-container" onClick={func}>
          <label>More</label>
          <FiChevronsRight />
        </div>
      )}
    </div>
  );
};

export default DashboardField;
