import React from "react";
import "./HeaderComponent.scss";
import { FiFilter } from "react-icons/fi";

const HeaderComponent = ({ pageName, withFilter = false }) => {
  return (
    <div className="main-content-header">
      <div className="left-side-container">
        <label className="lbl-style title-style">{pageName}</label>
        <label className="greeting-msg-style">
          Greetings Mohammad Alnammas
        </label>
      </div>
      {withFilter && (
        <div className="filter-container">
          <FiFilter size="2rem" color="#53a6dc" />
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
