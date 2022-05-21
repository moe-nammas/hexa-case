import React from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
import { AiOutlineFileSearch } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-small-boxes-container">
        <DashboardField title={"Number Of Alerts"} stats={"0"} />
        <DashboardField title={"Number Of Cases"} stats={"41"} />
        <DashboardField title={"Number Of Tickets "} stats={"92"} />
        <DashboardField title={"Alerts"} stats={"0"} />
        <DashboardField
          title={"Cases"}
          stats={"103"}
          icon={<AiOutlineFileSearch />}
        />
        <DashboardField title={"Tickets"} stats={"85"} />
      </div>
    </div>
  );
};

export default Dashboard;
