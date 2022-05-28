import React from "react";
import "./IconLabel.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../../../Redux/Actions/index";

const IconLabel = ({ label, icon }) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (label === "Logout") {
      dispatch(userActionCreator.logout());
      router("/");
      return;
    }
    router(`/${label}`);
  };
  return (
    <div className="icon-lbl-container" onClick={handleClick}>
      <label className="label">{label}</label>
      <label className="label" style={{ paddingBottom: "7px" }}>
        {icon}
      </label>
    </div>
  );
};

export default IconLabel;
