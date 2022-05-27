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
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedChoice(e.target.innerText);
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
            {!selectedChoice ? "Search" : selectedChoice}
          </DropdownToggle>
          <DropdownMenu className="dropdown-choices-container">
            {choices.map((item) => (
              <DropdownItem key={item} onClick={(e) => handleDropdownChange(e)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="text-container">
        <Input className="search-input" />
      </div>
      <div className="search-btn-container">
        <Button className="search-btn">Search</Button>
      </div>
    </div>
  );
};

export default SearchBy;
