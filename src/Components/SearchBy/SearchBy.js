import React, { useState } from "react";
import "./SearchBy.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Button,
} from "reactstrap";
import moment from "moment";
import { Camelize } from "../../Helpers/Camelize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar3 } from "react-icons/bs";

const FROM = new Date();
const TO = new Date();

const SearchBy = ({ choices, data, setData }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Search By");
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearchClick = () => {
    if (selectedChoice !== "Search By" && searchTerm) {
      // console.log(data);
      const filteredData = data.filter((item) => {
        const selected = Camelize(selectedChoice);
        return item[selected].toLocaleLowerCase().includes(searchTerm);
      });
      console.log(filteredData);
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
          onChange={(e) => handleSearchInput(e)}
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
          maxDate={toDate ? toDate : FROM}
        />
        <DatePicker
          placeholderText="To Date"
          selected={toDate}
          onChange={(date) => setToDate(date)} //only when value has changed
          className="datetime-picker-style"
          minDate={fromDate ? fromDate : FROM}
        />
      </div>
      <div className="search-btn-container">
        <Button
          className="search-btn"
          onClick={handleSearchClick}
          disabled={selectedChoice === "Search By" ? true : false}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBy;
