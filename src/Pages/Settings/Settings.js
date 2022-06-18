import React from "react";
import "./Settings.scss";
import SettingsCard from "../../Components/SettingsCard/SettingsCard";
import { FiUser, FiAlertTriangle } from "react-icons/fi";
import { AiOutlineSafety, AiOutlineInfoCircle } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Settings = () => {
  const settingsList = [
    {
      title: "Users",
      icon: <FiUser />,
      path: "/Users",
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
      path: "/Cases",
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
