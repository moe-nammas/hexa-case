import React, { useEffect } from "react";
import "./DashboardMediumContainer.scss";
import PieChart from "../../../Charts/PieChart/PieChart";
import { FiChevronsRight } from "react-icons/fi";

const DashboardMediumContainer = ({ dataSet, type, title }) => {
  return (
    <div className="dashboard-m-container">
      <div className="title-container">{title}</div>
      <div className="content-container">
        {type === "Pie" && <PieChart dataSet={dataSet} />}
      </div>
      <div className="footer-container">
        <label>More</label>
        <FiChevronsRight />
      </div>
    </div>
  );
};

export default DashboardMediumContainer;
