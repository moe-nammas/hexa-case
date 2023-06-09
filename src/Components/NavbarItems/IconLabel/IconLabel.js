import React from "react";
import "./IconLabel.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import { userActionCreator } from "../../../Redux/Actions/index";

const IconLabel = ({ label, icon, active, setCurrentActive, pathname }) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (label === "Logout") {
      dispatch(userActionCreator.logout());
      router("/");
      return;
    }
    dispatch(pageTitleCreator.change({ title: label }));
    router(`/${pathname}`);
    setCurrentActive(label);
  };

  return (
    <div
      className="icon-lbl-container"
      id={`${active ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="icon-label-wrapper">
        <label className="label" style={{ paddingBottom: "7px" }}>
          {icon}
        </label>
        <label className="label">{label}</label>
      </div>
    </div>
  );
};

export default IconLabel;
