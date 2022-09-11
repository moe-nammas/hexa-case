import React, { useEffect } from "react";
import "./Settings.scss";
import SettingsCard from "../../../Components/SettingsCard/SettingsCard";
import { FiUser, FiAlertTriangle } from "react-icons/fi";
import { AiOutlineSafety, AiOutlineInfoCircle } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";

const Settings = () => {
  const dispatch = useDispatch();

  const settingsList = [
    {
      title: "Users",
      icon: <FiUser />,
      path: "/Settings/Users/ViewUsers",
    },
    {
      title: "Roles & Permissions",
      icon: <AiOutlineSafety />,
      path: "/Permissions",
    },
    {
      title: "System",
      icon: <BsGear />,
      path: "/System",
    },
    {
      title: "About",
      icon: <AiOutlineInfoCircle />,
      path: "/About",
    },
    {
      title: "Cases",
      icon: <AiOutlineFileSearch />,
      path: "/Settings/CaseSettings",
    },
    {
      title: "Alerts",
      icon: <FiAlertTriangle />,
      path: "/Alerts",
    },
    {
      title: "Tickets",
      icon: <IoTicketOutline />,
      path: "/Tickets",
    },
    {
      title: "Notifications",
      icon: <MdOutlineNotificationsActive />,
      path: "/Notifications",
    },
  ];

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Settings" }));
  }, []);

  return (
    <div className="settings-container">
      {settingsList.map((item) => (
        <SettingsCard
          title={item.title}
          icon={item.icon}
          path={item.path}
          key={item.title}
        />
      ))}
    </div>
  );
};

export default Settings;
