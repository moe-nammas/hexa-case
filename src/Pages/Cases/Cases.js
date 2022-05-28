import React from "react";
import "./Cases.scss";
import TableTemplate from "../../Components/Table/TableTemplate";

const Cases = () => {
  const choices = ["Name", "Source IP", "Destination IP", "Time"];
  const headers = ["#", "First Name", "Last Name", "Username"];
  return (
    <div className="cases-container">
      <TableTemplate searchChoices={choices} headers={headers} />
    </div>
  );
};

export default Cases;
