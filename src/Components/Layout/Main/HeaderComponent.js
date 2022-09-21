import React, { useState } from "react";
import "./HeaderComponent.scss";
import { useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledPopover,
} from "reactstrap";

const HeaderComponent = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Today");

  const userInfo = useSelector((state) => state.user).user;
  const { pageTitle } = useSelector((state) => state.pageTitle);

  const handleDropdownChange = (e) => {
    setSelectedChoice(e.target.innerText);
  };

  return (
    <div className="main-content-header">
      <div className="left-side-container">
        <label className="lbl-style title-style">{pageTitle}</label>
        <label className="greeting-msg-style">
          Greetings&nbsp;
          {userInfo.userName.length > 0
            ? userInfo.userName
            : sessionStorage.getItem("userName")}
          <span> &#x1F44B;</span>
        </label>
      </div>
      {pageTitle?.includes("Dashboard") && (
        <div className="filter-container" id="filter-icon-container">
          <FiFilter size="2rem" className="filter-icon" />
          <UncontrolledPopover flip target="filter-icon-container">
            <Dropdown
              isOpen={openDropdown}
              toggle={() => {
                setOpenDropdown(!openDropdown);
              }}
              className="dropdown-style"
            >
              <DropdownToggle
                caret
                className="dropdown-style"
                style={{ borderRadius: "5px" }}
              >
                {selectedChoice}
              </DropdownToggle>
              <DropdownMenu className="dropdown-choices-container">
                <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                  Today
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                  Week
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                  Month
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                  Year
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </UncontrolledPopover>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
