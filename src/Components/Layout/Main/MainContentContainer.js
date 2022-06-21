import React, { useEffect } from "react";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import { Outlet, useLocation } from "react-router-dom";
import "./MainContentContainer.scss";
import HeaderComponent from "./HeaderComponent";

const MainContentContainer = () => {
  const location = useLocation();

  return (
    <div className="main-content-container">
      <HeaderComponent />
      <Outlet />
    </div>
  );
};

export default MainContentContainer;
