import React, { useEffect, useState } from "react";
import "./Cases.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { CasesApi } from "../../Api/AxiosApi";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../Redux/Actions/index";

const Cases = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const filters = ["Name", "Status", "Time"];
  const columns = [
    {
      name: "Case ID",
      sortable: true,
      selector: (row) => row.caseId,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
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
    {
      cell: (row) => (
        <div className="table-icons-container">
          <AiOutlineEye
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleButtonClick = (e, row) => {
    router("/CaseDetails", { state: row.caseId });
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await CasesApi.getCases();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          caseId: DataFormatter(item.caseId),
          name: DataFormatter(item.name),
          status: DataFormatter(item.status),
          createdBy: DataFormatter(item.createdBy),
          creationTime: DataFormatter(item.creationTime),
          closedBy: DataFormatter(item.closedBy),
          closedTime: DataFormatter(item.closedTime),
          severity: DataFormatter(item.severity),
        };
        return editedRow;
      });
      setCases(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Cases" }));
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
