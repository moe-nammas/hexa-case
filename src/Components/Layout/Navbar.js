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
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const router = useNavigate();
  const location = useLocation();

  const [currentActive, setCurrentActive] = useState(location.pathname);

  const [iconLabelList, setIconLabelList] = useState([
    {
      label: "Dashboard",
      Icon: <MdOutlineSpaceDashboard />,
      active: true,
      pathname: "Dashboard",
    },
    {
      label: "Cases",
      Icon: <AiOutlineFileSearch />,
      active: false,
      pathname: "Cases",
    },
    {
      label: "Alerts",
      Icon: <FiAlertTriangle />,
      active: false,
      pathname: "Alerts",
    },
    {
      label: "Tickets",
      Icon: <IoTicketOutline />,
      active: false,
      pathname: "Tickets",
    },
    {
      label: "Settings",
      Icon: <GoSettings />,
      active: false,
      pathname: "Settings/AllSettings",
    },
  ]);

  useEffect(() => {
    setIconLabelList(
      iconLabelList.map((item) =>
        location.pathname.split("/")[1].includes(item.label)
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  }, [location]);

  return (
    <>
      <div className="navbar-container">
        <div className="img-container" onClick={() => router("/Dashboard")}>
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
                pathname={item.pathname}
              />
            ))}
            <div
              style={{
                borderLeft: "1px lightgray solid",
                height: "3rem",
                marginTop: "5px",
                marginLeft: "5px",
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
