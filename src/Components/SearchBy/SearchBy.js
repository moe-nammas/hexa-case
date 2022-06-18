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

const SearchBy = ({ choices, data, setData }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Search By");
  const [searchTerm, setSearchTerm] = useState("");

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
      const filteredData = data.map((item) => {
        const newData = Object.keys(item).map((v) => {
          if (v === selectedChoice.toLocaleLowerCase()) {
            if (item[v].includes(searchTerm)) {
              return item;
            }
          }
        });
        return newData;
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
        <Input placeholder="From" type="date" />
        <Input placeholder="To" type="date" />
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
