import React, { useEffect, useLayoutEffect, useState } from "react";
import DashboardField from "../../Components/DashboardContainers/DashboardField";
import "./Dashboard.scss";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsShieldX } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline, IoSpeedometerOutline } from "react-icons/io5";
import { GoDeviceDesktop } from "react-icons/go";
import DashboardMediumContainer from "../../Components/DashboardContainers/DashboardCharts/DashboardMediumContainer/DashboardMediumContainer";
import {
  AlertsApi,
  CasesApi,
  DashboardApi,
  DashboardSettingsApi,
} from "../../Api/AxiosApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AttackedAssetsModal from "../../Components/Modals/AttackedAssetsModal/AttackedAssetsModal";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../Redux/Actions/index";
import Loading from "../../Components/Loading/Loading";

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
  const [availableItems, setAvailableItems] = useState([]);

  const [items, setItems] = useState([]);

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
      const { data: availableItemsRes } = await DashboardSettingsApi.get("");
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
      setAvailableItems(availableItemsRes);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again");
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Dashboard" }));
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (
      availableItems &&
      availableItems.length &&
      alertsBySeverity &&
      topAlerts
    ) {
      setItems([
        {
          prefrenceID: 1,
          title: "Alerts",
          stats: numberOfAlerts,
          icon: <FiAlertTriangle />,
          isLoading: isLoading,
          type: "GeneralInfo",
          onClick: () => {
            router("/Alerts/ViewAlerts");
          },
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 1
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 2,
          title: "Cases",
          stats: numberOfCases,
          icon: <AiOutlineFileSearch />,
          isLoading: isLoading,
          type: "GeneralInfo",
          onClick: () => {
            router("/Cases/ViewCases");
          },
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 2
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 3,
          title: "Tickets",
          stats: 0,
          icon: <IoTicketOutline />,
          isLoading: isLoading,
          type: "GeneralInfo",
          onClick: () => {
            router("/Tickets/ViewTickets");
          },
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 3
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 4,
          title: "Monitored Assets",
          stats: 1365,
          icon: <GoDeviceDesktop />,
          isLoading: isLoading,
          type: "GeneralInfo",
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 4
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 5,
          title: "Attacked Assets",
          stats: numberOfAttackedAssets,
          icon: <BsShieldX />,
          isLoading: isLoading,
          type: "GeneralInfo",
          onClick: () => {
            getAttackedAssets();
            setOpenAttackedAssetsModal(true);
          },
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 5
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 6,
          title: "APS",
          stats: 103,
          icon: <IoSpeedometerOutline />,
          isLoading: isLoading,
          type: "GeneralInfo",
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 6
            );
            return dashboardItem.checked;
          },
        },
        {
          prefrenceID: 7,
          title: "Alerts By Severity",
          stats: alertsBySeverity.data,
          icon: <IoSpeedometerOutline />,
          isLoading: isLoading,
          type: "Chart",
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 7
            );
            return dashboardItem.checked;
          },
          labels: alertsBySeverity.labels,
        },
        {
          prefrenceID: 8,
          title: "Top Alerts",
          stats: topAlerts.data,
          icon: <IoSpeedometerOutline />,
          isLoading: isLoading,
          type: "Chart",
          show: () => {
            const dashboardItem = availableItems?.find(
              (v) => v.prefrenceID === 8
            );
            return dashboardItem.checked;
          },
          labels: topAlerts.labels,
        },
      ]);
    }
  }, [availableItems]);

  return isLoading ? (
    <div className="loading">
      <Loading />
    </div>
  ) : (
    <>
      <AttackedAssetsModal
        openModal={openAttackedAssetsModal}
        setOpenModal={setOpenAttackedAssetsModal}
        data={attackedAssets}
        isLoading={attackedAssetsLoading}
      />
      <div className="dashboard-container">
        <div className="dashboard-small-boxes-container">
          {items.map(
            (item) =>
              item.type === "GeneralInfo" &&
              item.show() && (
                <DashboardField
                  title={item.title}
                  stats={item.stats}
                  icon={item.icon}
                  isLoading={item.isLoading}
                  key={item.title}
                  onClick={item.onClick}
                />
              )
          )}
        </div>
        <div className="dashboard-medium-boxes-container">
          {items.map(
            (item) =>
              item.show() &&
              item.type === "Chart" && (
                <DashboardMediumContainer
                  labels={item.labels}
                  data={item.stats}
                  title={item.title}
                  isLoading={item.isLoading}
                  type="Pie"
                  key={item.title}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
