import React, { useEffect, useState } from "react";
import "../Cases.scss";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { CasesApi } from "../../../Api/AxiosApi";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineRotateLeft } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import {
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  Badge,
} from "reactstrap";
import { isAuthorized } from "../../../Helpers/Premissions";
import { ColorResolver } from "../../../Helpers/ColorResolver";

const Cases = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user).user;

  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Status");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [formData, setFormData] = useState({
    caseId: 0,
    status: "",
    userName: user.userName,
  });

  const filters = ["Name", "Status", "Time"];
  const columns = [
    {
      name: "Case ID",
      sortable: true,
      selector: (row) => row.caseId,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge
          pill
          className={`${
            ColorResolver(row.status) === "warning" ? "text-dark" : ""
          }`}
          color={`${ColorResolver(row.status)}`}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Created By",
      sortable: true,
      selector: (row) => row.createdBy,
    },
    {
      name: "Created Time",
      sortable: true,
      selector: (row) => row.creationTime,
    },
    {
      name: "Closed Time",
      sortable: true,
      selector: (row) => row.closedTime,
    },
    {
      name: "Closed by",
      sortable: true,
      selector: (row) => row.closedBy,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
      cell: (row) => (
        <Badge
          pill
          className={`${
            ColorResolver(row.severity) === "warning" ? "text-dark" : ""
          }`}
          color={`${ColorResolver(row.severity)}`}
        >
          {row.severity}
        </Badge>
      ),
    },
    {
      cell: (row) => (
        <div className="table-icons-container">
          <AiOutlineEye
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
            id={`view-icon-${row.caseId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`view-icon-${row.caseId}`}
            placement="left"
          >
            View
          </UncontrolledTooltip>
          {isAuthorized(1,2) &&
            (row.status === "closed" ? (
              <>
                <IoTrashOutline
                  className="delete-icon-style"
                  onClick={() => handleDelete(row)}
                  id={`delete-icon-${row.userID}`}
                />
                <UncontrolledTooltip
                  autohide
                  flip
                  target={`delete-icon-${row.userID}`}
                  placement="left"
                >
                  Delete
                </UncontrolledTooltip>
              </>
            ) : (
              <>
                <MdOutlineRotateLeft
                  className="edit-icon-style"
                  id={`status-icon-${row.caseId}`}
                  onClick={() => {
                    setFormData({ ...formData, caseId: row.caseId });
                    setOpenModal(true);
                  }}
                />
                <UncontrolledTooltip
                  autohide
                  flip
                  target={`status-icon-${row.caseId}`}
                  placement="left"
                >
                  Change Status
                </UncontrolledTooltip>
              </>
            ))}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleButtonClick = (e, row) => {
    router(`/Cases/${row.caseId}`);
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, status: e.target.innerText });
    setSelectedChoice(e.target.innerText);
    setIsValidStatus(true);
  };

  const handleDelete = async (row) => {
    try {
      await CasesApi.delete(row.caseId);
      toast.success("Case has been deleted successfully");
      getTableData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later");
    }
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const {data:res} = await CasesApi.getCases(limit, limit * (currentPage - 1));
      setTotal(res.total);
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          caseId: DataFormatter(item.caseId),
          name: DataFormatter(item.name),
          status: DataFormatter(item.status),
          createdBy: DataFormatter(item.createdBy),
          creationTime: DataFormatter(item.creationTime),
          closedBy: DataFormatter(item.closedBy),
          closedTime: DataFormatter(item.closedTime),
          severity: DataFormatter(item.severity),
        };
        return editedRow;
      });
      setCases(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Cases" }));
    getTableData();
  }, [limit, currentPage]);

  const handleChangeStatus = async () => {
    try {
      setIsSubmiting(true);
      if (formData.status === "Status" || formData.status === "") {
        setIsValidStatus(false);
        setIsSubmiting(false);
        return;
      }
      await CasesApi.changeStatus(formData);
      toast.success("Status Changed Successfully");
      setIsSubmiting(false);
      setOpenModal(false);
      getTableData();
    } catch (error) {
      console.log(error);
      setIsSubmiting(false);
      toast.error("Something went wrong! please try again later");
    }
  };

  return (
    <div className="content-container">
      <Modal toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
        <ModalHeader toggle={() => setOpenModal(false)}>
          Change Case Status
        </ModalHeader>
        <ModalBody>
          {isSubmiting ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loading />
            </div>
          ) : (
            <div className="modal-body-container">
              <div>
                <Dropdown
                  isOpen={openDropdown}
                  toggle={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                  className="status-dropdown"
                >
                  <DropdownToggle
                    caret
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {selectedChoice}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%" }}>
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      Status
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      open
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      closed
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {!isValidStatus && (
                  <label style={{ color: "#9f3a38" }}>
                    Please select a status
                  </label>
                )}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="primary-btn-style"
            onClick={handleChangeStatus}
            disabled={isSubmiting}
          >
            Confirm
          </Button>
          <Button
            className="secondary-btn-style"
            onClick={() => {
              setOpenModal(false);
            }}
            disabled={isSubmiting}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <TableTemplate
          searchChoices={filters}
          columns={columns}
          data={cases}
          // handleSelectedRow={handleSelectedRow}
          setCurrentPage={setCurrentPage}
          setLimit={setLimit}
          currentPage={currentPage}
          total={total}
          rowsPerPage={limit}
        />
      )}
    </div>
  );
};

export default Cases;
