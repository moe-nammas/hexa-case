import React from "react";
import "./SettingsCard.scss";
import { FiChevronsRight } from "react-icons/fi";
const SettingsCard = ({ title, icon }) => {
  return (
    <div className="settings-card-container">
      <div className="icon-container">{icon}</div>
      <div className="title-container">{title}</div>
      <div className="more-container">
        <FiChevronsRight />
      </div>
    </div>
  );
};

export default SettingsCard;
