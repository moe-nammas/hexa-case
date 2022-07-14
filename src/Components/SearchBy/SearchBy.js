import React, { useState, useEffect } from "react";
import "./SearchBy.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Button,
} from "reactstrap";
import { Camelize } from "../../Helpers/Camelize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);

const SearchBy = ({ choices, data, setData, searchTerm, setSearchTerm }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Search By");

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleDropdownChange = (e) => {
    if (e.target.innerText === "Search By") {
      setSearchTerm("");
      setData([]);
    }
    setSelectedChoice(e.target.innerText);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!searchTerm) setData([]);
    else {
      handleSearchClick();
    }
  }, [searchTerm]);

  const handleSearchClick = () => {
    if (selectedChoice !== "Search By" && searchTerm) {
      const filteredData = data.filter((item) => {
        const selected = Camelize(selectedChoice);
        return typeof item[selected] === "string"
          ? item[selected].toLocaleLowerCase().includes(searchTerm)
          : item[selected].toString().includes(searchTerm);
      });
      setData(filteredData);
    }
  };

  return (
    <div className="search-by-container">
      <div className="dropdown-container">
        <Dropdown
          isOpen={openDropdown}
          toggle={() => {
            setOpenDropdown(!openDropdown);
          }}
          className="dropdown-style"
        >
          <DropdownToggle caret className="dropdown-style">
            {selectedChoice}
          </DropdownToggle>
          <DropdownMenu className="dropdown-choices-container">
            <DropdownItem onClick={(e) => handleDropdownChange(e)}>
              Search By
            </DropdownItem>
            <DropdownItem divider />
            {choices.map((item) => (
              <DropdownItem key={item} onClick={(e) => handleDropdownChange(e)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="text-container">
        <Input
          className="search-input"
          value={searchTerm}
          type="search"
          onChange={(e) => handleSearchInput(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              document.getElementById("search-btn").click();
          }}
          disabled={selectedChoice === "Search By" ? true : false}
        />
      </div>
      <div className="datetime-container">
        <DatePicker
          placeholderText="From Date"
          selected={fromDate}
          selectsStart
          onChange={(date) => setFromDate(date)} //only when value has changed
          className="datetime-picker-style"
          maxDate={toDate ? toDate : TODAY}
        />
        <DatePicker
          placeholderText="To Date"
          selected={toDate}
          onChange={(date) => setToDate(date)} //only when value has changed
          className="datetime-picker-style"
          minDate={fromDate ? fromDate : TODAY}
          maxDate={TODAY}
        />
      </div>
      <div className="search-btn-container">
        <Button
          className="primary-btn-style search-btn"
          onClick={handleSearchClick}
          disabled={selectedChoice === "Search By" ? true : false}
          id="search-btn"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBy;
