import React, { useEffect, useState } from "react";
import "./Alerts.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { AlertsApi } from "../../Api/AxiosApi";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const choices = ["Alert ID", "Rule Name", "Severity", "Time", "Status"];
  const [isLoading, setIsLoading] = useState(false);

  const router = useNavigate();

  const columns = [
    {
      name: "Alert ID",
      sortable: true,
      selector: (row) => row.alertId,
    },
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
    // {
    //   name: "Description",
    //   sortable: true,
    //   selector: (row) => row.description,
    // },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
    // {
    //   name: "Score",
    //   sortable: true,
    //   selector: (row) => row.score,
    // },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    // {
    //   name: "Agent",
    //   sortable: true,
    //   selector: (row) => row.agent,
    // },
    // {
    //   name: "User Name",
    //   sortable: true,
    //   selector: (row) => row.username,
    // },
    // {
    //   name: "Host IP",
    //   sortable: true,
    //   selector: (row) => row.hostIp,
    // },
    // {
    //   name: "Destination IP",
    //   sortable: true,
    //   selector: (row) => row.desinationIp,
    // },
    {
      cell: (row) => (
        <div className="table-icons-container">
          <AiOutlineEye
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
          />
          <IoTrashOutline
            className="delete-icon-style"
            onClick={(e) => handleDelete(e, row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleDelete = async (e, row) => {
    //try {
    //   await UsersApi.deleteUser(row.userId);
    //   toast.success("User Deleted Successfully");
    //   getTableData();
    // } catch (error) {}
  };

  const handleButtonClick = (e, row) => {
    router("/ViewAlertDetails", { state: row.alertId });
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await AlertsApi.getAlerts();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          alertId: DataFormatter(item.alertId),
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
      toast.error("Something went wrong! try again later");
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
          multiSelection
        />
      )}
    </div>
  );
};

export default Alerts;
