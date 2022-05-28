import React, { useEffect, useState } from "react";
import "./SearchBy.scss";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Button,
} from "reactstrap";
const SearchBy = ({ choices }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Search By");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedChoice(e.target.innerText);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
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
          onChange={(e) => handleSearchInput(e)}
          disabled={selectedChoice === "Search By" ? true : false}
        />
      </div>
      <div className="search-btn-container">
        <Button
          className="search-btn"
          disabled={selectedChoice === "Search By" ? true : false}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBy;
