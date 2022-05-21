import React from "react";
import "./IconLabel.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";

const IconLabel = ({ label, icon }) => {
  const router = useNavigate();
  return (
    <div className="icon-lbl-container" onClick={() => router(`/${label}`)}>
      <label className="label">{label}</label>
      <label className="label" style={{ paddingBottom: "7px" }}>
        {icon}
      </label>
    </div>
  );
};

export default IconLabel;
