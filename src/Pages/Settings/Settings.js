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
    },
    {
      title: "Permissions",
      icon: <AiOutlineSafety />,
    },
    {
      title: "System",
      icon: <BsGear />,
    },
    {
      title: "About",
      icon: <AiOutlineInfoCircle />,
    },
    {
      title: "Cases",
      icon: <AiOutlineFileSearch />,
    },
    {
      title: "Alerts",
      icon: <FiAlertTriangle />,
    },
    {
      title: "Tickets",
      icon: <IoTicketOutline />,
    },
    {
      title: "Notification",
      icon: <MdOutlineNotificationsActive />,
    },
  ];

  return (
    <div className="settings-container">
      {settingsList.map((item) => (
        <SettingsCard title={item.title} icon={item.icon} />
      ))}
    </div>
  );
};

export default Settings;
