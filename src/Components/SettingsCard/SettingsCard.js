import React from "react";
import "./SettingsCard.scss";
import { FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SettingsCard = ({ title, icon, path }) => {
  const router = useNavigate();

  const handleRoute = () => {
    router(`${path}`);
  };
  return (
    <div className="settings-card-container" onClick={() => handleRoute()}>
      <div className="icon-container">{icon}</div>
      <div className="title-container">{title}</div>
      <div className="more-container">
        <FiChevronsRight />
      </div>
    </div>
  );
};

export default SettingsCard;
