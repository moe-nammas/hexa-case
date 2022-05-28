import React from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsShieldX } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { GoDeviceDesktop } from "react-icons/go";
import DashboardMediumContainer from "../../Components/DashboardContainers/DashboardCharts/DashboardMediumContainer/DashboardMediumContainer";

const Dashboard = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "LightBlue"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#e62e51",
          "#235494",
          "#efa81b",
          "#58b84c",
          "#b23cfd",
          "#53a6dc",
        ],
        borderColor: [
          "#e62e51",
          "#235494",
          "#efa81b",
          "#58b84c",
          "#b23cfd",
          "#53a6dc",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-small-boxes-container">
        <DashboardField
          title={"Alerts"}
          stats={"0"}
          icon={<FiAlertTriangle />}
        />
        <DashboardField
          title={"Cases"}
          stats={"41"}
          icon={<AiOutlineFileSearch />}
        />
        <DashboardField
          title={"Tickets"}
          stats={"92"}
          icon={<IoTicketOutline />}
        />
        <DashboardField
          title={"Monitored Assets"}
          stats={"0"}
          icon={<GoDeviceDesktop />}
        />
        <DashboardField
          title={"Attacked Assets"}
          stats={"85999"}
          icon={<BsShieldX />}
        />
        <DashboardField
          title={"Tickets"}
          stats={"85"}
          icon={<IoTicketOutline />}
        />
        <DashboardField
          title={"APS"}
          stats={"103"}
          icon={<FiAlertTriangle />}
          // more={false}
        />
      </div>
      <div className="dashboard-medium-boxes-container">
        <DashboardMediumContainer dataSet={data} type="Pie" />
        <DashboardMediumContainer dataSet={data} type="Pie" />
      </div>
    </div>
  );
};

export default Dashboard;
