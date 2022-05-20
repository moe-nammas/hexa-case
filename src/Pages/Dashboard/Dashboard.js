import React from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-small-boxes-container">
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"0"}
          color={"#ff1700"}
        />
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"41"}
          color={"#ff1700"}
        />
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"41"}
          color={"#ff1700"}
        />
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"0"}
          color={"#ff1700"}
        />
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"0"}
          color={"#ff1700"}
        />
        <DashboardField
          title={"Number Of Alerts Today"}
          stats={"41"}
          color={"#ff1700"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
