import React, { useState, useEffect } from "react";
import "./DashboardCustomization.scss";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineBarChart } from "react-icons/ai";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../../Redux/Actions/index";

const DashboardCustomization = () => {
  const dispatch = useDispatch();
  const [generalInfo, setGeneralInfo] = useState([
    {
      name: "Alerts",
      checked: true,
    },
    {
      name: "Cases",
      checked: true,
    },
    {
      name: "Tickets",
      checked: false,
    },
    {
      name: "Monitored Assets",
      checked: true,
    },
    {
      name: "Attacked Assets",
      checked: true,
    },
    {
      name: "APS",
      checked: true,
    },
  ]);

  const [charts, setCharts] = useState([
    {
      name: "Alerts By Severity (Pie Chart)",
      checked: true,
    },
    {
      name: "Top Alerts (Pie Chart)",
      checked: false,
    },
  ]);

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Dashboard Customizations" }));
  }, []);

  const handleGeneralInfoCheckChange = (e) => {
    setGeneralInfo(
      generalInfo.map((item) =>
        item.name === e.target.name
          ? { name: item.name, checked: !item.checked }
          : item
      )
    );
  };

  const handleChartsCheckChange = (e) => {
    setCharts(
      charts.map((item) =>
        item.name === e.target.name
          ? { name: item.name, checked: !item.checked }
          : item
      )
    );
  };

  return (
    <div className="content-container dashboard-customization-container">
      <div className="card-container">
        <div className="component-header-style card-header-container">
          <HiOutlineInformationCircle size={"35px"} />
          <label>General Info</label>
        </div>
        <div className="checkboxes-container">
          {generalInfo.map((item) => (
            <FormGroup
              check
              className={item.checked ? "checked-style" : "unchecked-style"}
              key={item.name}
            >
              <Input
                type="checkbox"
                checked={item.checked}
                onChange={handleGeneralInfoCheckChange}
                name={item.name}
              />
              <Label check>{item.name}</Label>
            </FormGroup>
          ))}
        </div>
      </div>
      <div className="card-container">
        <div className="component-header-style card-header-container">
          <AiOutlineBarChart size={"35px"} />
          <label>Charts</label>
        </div>
        <div className="checkboxes-container">
          {charts.map((item) => (
            <FormGroup
              check
              className={item.checked ? "checked-style" : "unchecked-style"}
              key={item.name}
            >
              <Input
                type="checkbox"
                checked={item.checked}
                onChange={handleChartsCheckChange}
                name={item.name}
              />
              <Label check>{item.name}</Label>
            </FormGroup>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomization;
