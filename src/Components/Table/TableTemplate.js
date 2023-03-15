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
  total,
  noSearch = false,
  rowsPerPage,
  setLimit,
  currentPage,
  setCurrentPage
}) => {
  const [tempData, setTempData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        backgroundColor: "#F0F0F0",
        width: "fit-content",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        width: "fit-content",
      },
    },
    pagination: {
      style: {
        fontSize: "15px",
        color: "rgba(0,0,0,.6)",
        fontWeight: "500",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => {
        return row.severity === "medium";
      },
      style: {
        backgroundColor: "#fcf3a6",
      },
    },
    {
      when: (row) => {
        return row.severity === "high";
      },
      style: {
        backgroundColor: "#FFCDD2",
      },
    },
  ];
  return (
    <div className="table-template-container">
      {!noSearch && (
        <div className="search-container">
          <SearchBy
            choices={searchChoices}
            data={data}
            setData={setTempData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      )}
      <DataTable
        columns={columns}
        data={searchTerm.length > 0 ? tempData : data}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        selectableRows={multiSelection}
        onSelectedRowsChange={handleSelectedRow}
        responsive
        pagination
        paginationServer
        onChangePage={(page) => {
          setCurrentPage(page);
        }}
        onChangeRowsPerPage={(currentRowsPerPage) => {
          setLimit(currentRowsPerPage);
        }}
        paginationPerPage={rowsPerPage}
        paginationDefaultPage={currentPage}
        paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
        paginationTotalRows={total}
      />
    </div>
  );
};

export default TableTemplate;
