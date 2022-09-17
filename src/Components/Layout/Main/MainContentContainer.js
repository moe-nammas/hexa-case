import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./MainContentContainer.scss";
import HeaderComponent from "./HeaderComponent";

const MainContentContainer = () => {
  return (
    <div className="main-content-container">
      <HeaderComponent />
      <Outlet />
    </div>
  );
};

export default MainContentContainer;
