import React, { useEffect, useState } from "react";
import "./Cases.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { CasesApi } from "../../Api/AxiosApi";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const filters = ["Name", "Description", "Status", "Time"];
  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => row.description,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Created By",
      sortable: true,
      selector: (row) => row.createdBy,
    },
    {
      name: "Created Time",
      sortable: true,
      selector: (row) => row.creationTime,
    },
    {
      name: "Closed Time",
      sortable: true,
      selector: (row) => row.closedTime,
    },
    {
      name: "Closed by",
      sortable: true,
      selector: (row) => row.closedBy,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
  ];

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await CasesApi.getCases();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          name: DataFormatter(item.name),
          description: DataFormatter(item.description),
          status: DataFormatter(item.status),
          createdBy: DataFormatter(item.createdBy),
          creationTime: DataFormatter(item.creationTime),
          closedTime: DataFormatter(item.closedTime),
          severity: DataFormatter(item.severity),
        };
        return editedRow;
      });
      setCases(flattenedData);
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
    <div className="cases-container">
      {isLoading ? (
        <Loading />
      ) : (
        <TableTemplate searchChoices={filters} columns={columns} data={cases} />
      )}
    </div>
  );
};

export default Cases;
