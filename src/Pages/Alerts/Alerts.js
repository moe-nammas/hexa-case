import React from "react";
import "./Alerts.scss";
import TableTemplate from "../../Components/Table/TableTemplate";

const Alerts = () => {
  const choices = ["Name", "Source IP", "Destination IP"];
  const headers = [
    "ID",
    "Time",
    "Severity",
    "Status",
    "Host IP",
    "Destination IP",
  ];
  return (
    <div className="Alerts-container">
      <TableTemplate searchChoices={choices} headers={headers} />
    </div>
  );
};

export default Alerts;
