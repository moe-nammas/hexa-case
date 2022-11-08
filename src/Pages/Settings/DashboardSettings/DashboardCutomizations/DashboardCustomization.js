import React, { useState, useEffect } from "react";
import "./DashboardCustomization.scss";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlinePieChart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../../Redux/Actions/index";
import DasboardSettingsCard from "../../../../Components/DashboardSettingsCard/DashboradSettingsCard";

const DashboardCustomization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Dashboard Customizations" }));
  }, []);

  return (
    <div className="content-container dashboard-customization-container">
      <DasboardSettingsCard
        title="General Info"
        type="GeneralInfo"
        icon={<HiOutlineInformationCircle size={"35px"} />}
      />
      <DasboardSettingsCard
        title="Charts"
        type="Chart"
        icon={<AiOutlinePieChart size={"35px"} />}
      />
    </div>
  );
};

export default DashboardCustomization;
