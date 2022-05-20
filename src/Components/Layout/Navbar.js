import React from "react";
import "./Navbar.scss";
import logo from "../../Assets/Images/kytl-logo.png";
import IconLabel from "../NavbarItems/IconLabel/IconLabel";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import {
  FcSalesPerformance,
  FcEngineering,
  FcBriefcase,
  FcHighPriority,
} from "react-icons/fc";
import { FaTicketAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import MainContentContainer from "./Main/MainContentContainer";

const Navbar = () => {
  // const iconLabelList = [
  //   {
  //     label: "Dashboard",
  //     icon: <FcSalesPerformance />,
  //   },
  //   {
  //     label: "Cases",
  //     Icon: <IoBriefcaseOutline />,
  //   },
  //   {
  //     label: "Alerts",
  //     Icon: <AiOutlineAlert />,
  //   },
  //   {
  //     label: "Tickets",
  //     Icon: <FaTicketAlt />,
  //   },
  // ];

  return (
    <>
      <div className="navbar-container">
        <div className="img-container">
          <img src={logo} width="100%" height="100%" />
        </div>
        <div className="navbar-content-container">
          <div className="iconLabels-container">
            {/* {iconLabelList.map((item) => { */}
            <IconLabel label={"Dashboard"} icon={<MdOutlineSpaceDashboard />} />
            <IconLabel label={"Cases"} icon={<AiOutlineFileSearch />} />
            <IconLabel label={"Alerts"} icon={<FiAlertTriangle />} />
            <IconLabel label={"Tickets"} icon={<IoTicketOutline />} />
            <IconLabel label={"Settings"} icon={<GoSettings />} />
            <div
              style={{
                borderLeft: "1px lightgray solid",
                height: "3rem",
                marginTop: "1.5rem",
              }}
            ></div>
            <IconLabel label={"Logout"} icon={<IoIosLogOut />} />
            {/* })} */}
          </div>
        </div>
      </div>
      <MainContentContainer />
    </>
  );
};

export default Navbar;