import React, { useEffect } from "react";
import "./DashboardMediumContainer.scss";
import PieChart from "../../../Charts/PieChart/PieChart";
import { FiChevronsRight } from "react-icons/fi";
import Loading from "../../../Loading/Loading";

const DashboardMediumContainer = ({ labels, data, type, title, isLoading }) => {
  return (
    <div className="dashboard-m-container">
      <div className="title-container">{title}</div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="content-container">
          {type === "Pie" && <PieChart labels={labels} data={data} />}
        </div>
      )}
      {/* <div className="footer-container">
        <label>More</label>
        <FiChevronsRight />
      </div> */}
    </div>
  );
};

export default DashboardMediumContainer;
