import React from "react";
import "./SettingsCard.scss";
import { FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../Redux/Actions/index";

const SettingsCard = ({ title, icon, path }) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleRoute = () => {
    router(`${path}`);
    dispatch(pageTitleCreator.change({ title: title }));
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
