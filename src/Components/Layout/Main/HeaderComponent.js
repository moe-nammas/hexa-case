import React, { useEffect } from "react";
import "./HeaderComponent.scss";
import { useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";

const HeaderComponent = () => {
  const userInfo = useSelector((state) => state.user);
  const { pageTitle } = useSelector((state) => state.pageTitle);

  return (
    <div className="main-content-header">
      <div className="left-side-container">
        <label className="lbl-style title-style">{pageTitle}</label>
        <label className="greeting-msg-style">
          Greetings {userInfo.userName ?? "User"}
        </label>
      </div>
      {pageTitle?.includes("Dashboard") && (
        <div className="filter-container">
          <FiFilter size="2rem" className="filter-icon" />
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
