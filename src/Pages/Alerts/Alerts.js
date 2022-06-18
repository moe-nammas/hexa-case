import React, { useEffect, useState } from "react";
import "./Alerts.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { AlertsApi } from "../../Api/AxiosApi";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const choices = ["Name", "Source IP", "Destination IP", "Time"];
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      name: "Time",
      sortable: true,
      selector: (row) => row.timeStamp,
    },
    {
      name: "Rule Name",
      sortable: true,
      selector: (row) => row.ruleName,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => row.description,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
    {
      name: "Score",
      sortable: true,
      selector: (row) => row.score,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Agent",
      sortable: true,
      selector: (row) => row.agent,
    },
    {
      name: "User Name",
      sortable: true,
      selector: (row) => row.username,
    },
    {
      name: "Host IP",
      sortable: true,
      selector: (row) => row.hostIp,
    },
    {
      name: "Destination IP",
      sortable: true,
      selector: (row) => row.desinationIp,
    },
  ];

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await AlertsApi.getAlerts();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          timeStamp: DataFormatter(item.timeStamp),
          ruleName: DataFormatter(item.ruleName),
          description: DataFormatter(item.description),
          severity: DataFormatter(item.severity),
          score: DataFormatter(item.score),
          agent: DataFormatter(item.agent),
          username: DataFormatter(item.username),
          hostIp: DataFormatter(item.hostIp),
          desinationIp: DataFormatter(item.desinationIp),
        };
        return editedRow;
      });
      setAlerts(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="Alerts-container">
      {isLoading ? (
        <Loading />
      ) : (
        <TableTemplate
          searchChoices={choices}
          columns={columns}
          data={alerts}
        />
      )}
    </div>
  );
};

export default Alerts;
