import React, { useEffect } from "react";
import "./Settings.scss";
import SettingsCard from "../../../Components/SettingsCard/SettingsCard";
import { FiUser, FiAlertTriangle, FiUserCheck } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import {
  MdOutlineNotificationsActive,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import { isAuthorized } from "../../../Helpers/Premissions";

const Settings = () => {
  const dispatch = useDispatch();

  const settingsList = [
    {
      title: "Users",
      icon: <FiUser />,
      path: "/Settings/Users",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Roles",
      icon: <FiUserCheck />,
      path: "/Settings/Roles",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
      path: "/Settings/DashboardSettings/Customizations",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Permissions",
      icon: <BsShieldLock />,
      path: "/Settings/Permissions",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Cases",
      icon: <AiOutlineFileSearch />,
      path: "/Settings/CaseSettings",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Alerts",
      icon: <FiAlertTriangle />,
      path: "/Alerts",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    {
      title: "Tickets",
      icon: <IoTicketOutline />,
      path: "/Tickets",
      isAuth: () => {
        return isAuthorized(1, 2);
      },
    },
    // {
    //   title: "Notifications",
    //   icon: <MdOutlineNotificationsActive />,
    //   path: "/Notifications",
    // },
  ];

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Settings" }));
  }, []);

  return (
    <div className="settings-container">
      {settingsList.map(
        (item) =>
          item.isAuth() && (
            <SettingsCard
              title={item.title}
              icon={item.icon}
              path={item.path}
              key={item.title}
            />
          )
      )}
    </div>
  );
};

export default Settings;
