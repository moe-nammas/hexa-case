import React, { useState } from "react";
import SearchBy from "../SearchBy/SearchBy";
import "./TableTemplate.scss";
import DataTable from "react-data-table-component";

const TableTemplate = ({
  columns,
  data,
  searchChoices,
  multiSelection,
  handleSelectedRow,
}) => {
  const [tempData, setTempData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        backgroundColor: "lightGray",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        // width: "15rem",
      },
    },
    pagination: {
      style: {
        fontSize: "15px",
        color: "black",
      },
    },
  };
  return (
    <div className="table-template-container">
      <div className="search-container">
        <SearchBy
          choices={searchChoices}
          data={data}
          setData={setTempData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <DataTable
        columns={columns}
        data={searchTerm.length > 0 ? tempData : data}
        customStyles={customStyles}
        pagination
        paginationPerPage={20}
        selectableRows={multiSelection}
        onSelectedRowsChange={handleSelectedRow}
        responsive
      />
    </div>
  );
};

export default TableTemplate;
