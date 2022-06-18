import React, { useEffect } from "react";
import "./HeaderComponent.scss";
import { FiFilter } from "react-icons/fi";
import { useSelector } from "react-redux";

const HeaderComponent = ({ pageName, withFilter = false }) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <div className="main-content-header">
      <div className="left-side-container">
        <label className="lbl-style title-style">{pageName}</label>
        <label className="greeting-msg-style">
          Greetings {userInfo.userName ?? "User"}
        </label>
      </div>
      {withFilter && (
        <div className="filter-container">
          <FiFilter size="2rem" className="filter-icon" />
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
