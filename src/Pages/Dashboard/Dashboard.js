import React, { useEffect, useState } from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsShieldX } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline, IoSpeedometerOutline } from "react-icons/io5";
import { GoDeviceDesktop } from "react-icons/go";
import DashboardMediumContainer from "../../Components/DashboardContainers/DashboardCharts/DashboardMediumContainer/DashboardMediumContainer";
import { AlertsApi, CasesApi, DashboardApi } from "../../Api/AxiosApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AttackedAssetsModal from "../../Components/Modals/AttackedAssetsModal/AttackedAssetsModal";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../Redux/Actions/index";

const Dashboard = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [numberOfCases, setNumberOfCases] = useState(0);
  const [numberOfAlerts, setNumberOfAlerts] = useState(0);
  const [numberOfAttackedAssets, setNumberOfAttackedAssets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [topAlerts, setTopAlerts] = useState({});
  const [alertsBySeverity, setAlertsBySeverity] = useState({});
  const [openAttackedAssetsModal, setOpenAttackedAssetsModal] = useState(false);
  const [attackedAssets, setAttackedAssets] = useState([]);
  const [attackedAssetsLoading, setAttackedAssetsLoading] = useState(false);

  const smallItems = [
    {
      title: "Alerts",
      stats: numberOfAlerts,
      icon: <FiAlertTriangle />,
      isLoading: isLoading,
      onClick: () => {
        router("/Alerts/ViewAlerts");
      },
      show: true,
    },
    {
      title: "Cases",
      stats: numberOfCases,
      icon: <AiOutlineFileSearch />,
      isLoading: isLoading,
      onClick: () => {
        router("/Cases/ViewCases");
      },
      show: true,
    },
    {
      title: "Tickets",
      stats: 0,
      icon: <IoTicketOutline />,
      isLoading: isLoading,
      show: false,
      onClick: () => {
        router("/Tickets/ViewTickets");
      },
    },
    {
      title: "Monitored Assets",
      stats: 1365,
      icon: <GoDeviceDesktop />,
      isLoading: isLoading,
      show: true,
    },
    {
      title: "Attacked Assets",
      stats: numberOfAttackedAssets,
      icon: <BsShieldX />,
      isLoading: isLoading,
      show: true,
      onClick: () => {
        getAttackedAssets();
        setOpenAttackedAssetsModal(true);
      },
    },
    {
      title: "APS",
      stats: 103,
      icon: <IoSpeedometerOutline />,
      isLoading: isLoading,
      show: true,
    },
  ];

  const getAttackedAssets = async () => {
    try {
      setAttackedAssetsLoading(true);
      const { data: attackedAssetsResponse } =
        await DashboardApi.getAttackedAssets();
      const flattenedData = attackedAssetsResponse.map((item) => {
        const editedRow = {
          ...item,
          destinationIp: item.destinationIp,
        };
        return editedRow;
      });
      setAttackedAssets(flattenedData);
      setAttackedAssetsLoading(false);
    } catch (error) {
      console.log(error);
      setAttackedAssetsLoading(false);
      toast.error("Something went wrong while loading...");
    }
  };

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const casesRes = await CasesApi.getNumberOfCases();
      const alertsRes = await AlertsApi.getNumberOfAlerts();
      const topAlertsGroupedByName = await DashboardApi.getTopAlerts();
      const alertsBySeverity = await DashboardApi.getAlertsBySeverity();
      const numberOfAttackedAssets =
        await DashboardApi.getNumberOfAttackedAssets();
      setTopAlerts({
        labels: topAlertsGroupedByName.data.map((item) => item.rulename),
        data: topAlertsGroupedByName.data.map((item) => item.numberOfOccurence),
      });
      setAlertsBySeverity({
        labels: alertsBySeverity.data.map((item) => item.severity),
        data: alertsBySeverity.data.map((item) => item.numberOfOccurence),
      });
      setNumberOfAlerts(alertsRes.data);
      setNumberOfCases(casesRes.data);
      setNumberOfAttackedAssets(numberOfAttackedAssets.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again");
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Dashboard" }));
    loadDashboardData();
  }, []);

  return (
    <>
      <AttackedAssetsModal
        openModal={openAttackedAssetsModal}
        setOpenModal={setOpenAttackedAssetsModal}
        data={attackedAssets}
        isLoading={attackedAssetsLoading}
      />
      <div className="dashboard-container">
        <div className="dashboard-small-boxes-container">
          {smallItems.map((item) => (
            <DashboardField
              title={item.title}
              stats={item.stats}
              icon={item.icon}
              isLoading={isLoading}
              key={item.title}
              onClick={item.onClick}
            />
          ))}
        </div>
        <div className="dashboard-medium-boxes-container">
          <DashboardMediumContainer
            labels={alertsBySeverity.labels}
            data={alertsBySeverity.data}
            type="Pie"
            title={"Alerts By Severity"}
            isLoading={isLoading}
          />
          <DashboardMediumContainer
            labels={topAlerts.labels}
            data={topAlerts.data}
            type="Pie"
            title={"Top Alerts"}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
