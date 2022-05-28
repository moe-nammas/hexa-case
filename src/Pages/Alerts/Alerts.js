import React, { useEffect } from "react";
import "./Alerts.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { AlertsApi } from "../../Api/AxiosApi";

const Alerts = () => {
  const choices = ["Name", "Source IP", "Destination IP", "Time"];
  const headers = [
    "ID",
    "Time",
    "Severity",
    "Status",
    "Host IP",
    "Destination IP",
  ];

  const testBackEnd = async () => {
    console.log("first");
    const res = await AlertsApi.test();
    console.log(res.data);
  };

  useEffect(() => {
    testBackEnd();
  }, []);

  return (
    <div className="Alerts-container">
      <TableTemplate searchChoices={choices} headers={headers} />
    </div>
  );
};

export default Alerts;
