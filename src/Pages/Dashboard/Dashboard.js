import React, { useEffect, useState } from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsShieldX } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline, IoSpeedometerOutline } from "react-icons/io5";
import { GoDeviceDesktop } from "react-icons/go";
import DashboardMediumContainer from "../../Components/DashboardContainers/DashboardCharts/DashboardMediumContainer/DashboardMediumContainer";
import { AlertsApi, CasesApi } from "../../Api/AxiosApi";

const Dashboard = () => {
  const [numberOfCases, setNumberOfCases] = useState(0);
  const [numberOfAlerts, setNumberOfAlerts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
  const data2 = {
    labels: ["Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["#235494", "#efa81b", "#58b84c"],
        borderColor: ["#235494", "#efa81b", "#58b84c"],
        borderWidth: 0,
      },
    ],
  };

  const smallItems = [
    {
      title: "Alerts",
      stats: numberOfAlerts,
      icon: <FiAlertTriangle />,
      isLoading: isLoading,
    },
    {
      title: "Cases",
      stats: numberOfCases,
      icon: <AiOutlineFileSearch />,
      isLoading: isLoading,
    },
    {
      title: "Tickets",
      stats: 91,
      icon: <IoTicketOutline />,
      isLoading: isLoading,
    },
    {
      title: "Monitored Assets",
      stats: 1365,
      icon: <GoDeviceDesktop />,
      isLoading: isLoading,
    },
    {
      title: "Attacked Assets",
      stats: 0,
      icon: <BsShieldX />,
      isLoading: isLoading,
    },
    {
      title: "Tickets",
      stats: 91,
      icon: <IoTicketOutline />,
      isLoading: isLoading,
    },
    {
      title: "APS",
      stats: 103,
      icon: <IoSpeedometerOutline />,
      isLoading: isLoading,
    },
  ];

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const casesRes = await CasesApi.getNumberOfCases();
      const alertsRes = await AlertsApi.getNumberOfAlerts();
      setNumberOfAlerts(alertsRes.data);
      setNumberOfCases(casesRes.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //TODO: Handle Error
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-small-boxes-container">
        {smallItems.map((item) => (
          <DashboardField
            title={item.title}
            stats={item.stats}
            icon={item.icon}
            isLoading={isLoading}
          />
        ))}
      </div>
      <div className="dashboard-medium-boxes-container">
        <DashboardMediumContainer
          dataSet={data}
          type="Pie"
          title={"Alerts By Severity"}
        />
        <DashboardMediumContainer
          dataSet={data2}
          type="Pie"
          title={"Top 3 Alerts"}
        />
        <DashboardMediumContainer
          dataSet={data2}
          type="Pie"
          title={"Top 3 Alerts"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
