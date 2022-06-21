import React, { useState } from "react";
import SearchBy from "../SearchBy/SearchBy";
import "./TableTemplate.scss";
import DataTable from "react-data-table-component";
import { useEffect } from "react";

const TableTemplate = ({
  columns,
  data,
  searchChoices,
  handleRowClick,
  multiSelection,
}) => {
  const [tempData, setTempData] = useState([]);
  const customStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        backgroundColor: "lightGray",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
        // width: "15rem",
      },
    },
    pagination: {
      style: {
        fontSize: "1rem",
        color: "black",
      },
    },
  };
  return (
    <div className="table-template-container">
      <div className="search-container">
        <SearchBy choices={searchChoices} data={data} setData={setTempData} />
      </div>
      <DataTable
        columns={columns}
        data={tempData.length > 0 ? tempData : data}
        customStyles={customStyles}
        pagination
        selectableRows={multiSelection}
        responsive
      />
    </div>
  );
};

export default TableTemplate;
