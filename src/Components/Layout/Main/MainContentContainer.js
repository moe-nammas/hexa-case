import React from "react";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import "./MainContentContainer.scss";
import HeaderComponent from "./HeaderComponent";

const MainContentContainer = () => {
  return (
    <>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Cases" element={<Dashboard />} />
      </Routes>
      <div className="main-content-container">
        <HeaderComponent pageName={"Dashboard"} withFilter />
        <Dashboard />
      </div>
    </>
  );
};

export default MainContentContainer;
