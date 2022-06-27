import React, { useState } from "react";
import "./Navbar.scss";
import logo from "../../Assets/Images/kytl-logo.png";
import IconLabel from "../NavbarItems/IconLabel/IconLabel";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { useEffect } from "react";

const Navbar = () => {
  const [currentActive, setCurrentActive] = useState("Dashboards");

  const iconLabelList = [
    {
      label: "Dashboard",
      Icon: <MdOutlineSpaceDashboard />,
      active: true,
    },
    {
      label: "Cases",
      Icon: <AiOutlineFileSearch />,
      active: false,
    },
    {
      label: "Alerts",
      Icon: <FiAlertTriangle />,
      active: false,
    },
    {
      label: "Tickets",
      Icon: <IoTicketOutline />,
      active: false,
    },
    {
      label: "Settings",
      Icon: <GoSettings />,
      active: false,
    },
  ];

  useEffect(() => {
    iconLabelList.map((item) => {
      item.label === currentActive
        ? (item.active = true)
        : (item.active = false);
    });
    console.log(iconLabelList);
  }, [currentActive]);

  return (
    <>
      <div className="navbar-container">
        <div className="img-container">
          <img src={logo} width="100%" height="100%" />
        </div>
        <div className="navbar-content-container">
          <div className="iconLabels-container">
            {iconLabelList.map((item) => (
              <IconLabel
                label={item.label}
                icon={item.Icon}
                key={item.label}
                active={item.active}
                setCurrentActive={setCurrentActive}
              />
            ))}
            <div
              style={{
                borderLeft: "1px lightgray solid",
                height: "3rem",
                marginTop: "5px",
              }}
            ></div>
            <IconLabel label={"Logout"} icon={<IoIosLogOut />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
