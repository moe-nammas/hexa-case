import React, { useState, useEffect } from "react";
import Loading from "../../../Components/Loading/Loading";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import toast from "react-hot-toast";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import { TicketsApi } from "../../../Api/AxiosApi";
import {
  Button,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdOutlineRotateLeft } from "react-icons/md";

const TicketsList = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Status");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    status: "",
  });

  const filters = ["Name", "Ticket Id", "Created By"];
  const columns = [
    {
      name: "Ticket ID",
      sortable: true,
      selector: (row) => row.ticketId,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.ticketName,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => row.ticketDescription,
    },
    {
      name: "Created By",
      sortable: true,
      selector: (row) => row.createdBy,
    },
    {
      name: "Created AT",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
    {
      name: "status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      cell: (row) => (
        <div className="table-icons-container">
          {row.status !== "closed" ? (
            <>
              <MdOutlineRotateLeft
                className="edit-icon-style"
                id={`status-icon-${row.ticketId}`}
                onClick={() => {
                  setFormData({ ...formData, id: row.ticketId });
                  setOpenModal(true);
                }}
              />
              <UncontrolledTooltip
                autohide
                flip
                target={`status-icon-${row.ticketId}`}
                placement="left"
              >
                Change Status
              </UncontrolledTooltip>
            </>
          ) : (
            <>
              <MdOutlineRotateLeft
                id={`disabled-icon-${row.ticketId}`}
                className="disabled-icon"
              />{" "}
              <UncontrolledTooltip
                autohide
                flip
                target={`disabled-icon-${row.ticketId}`}
                placement="left"
              >
                Status can't be changed. Ticket is closed
              </UncontrolledTooltip>{" "}
            </>
          )}
          <BiEdit
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
            id={`edit-icon-${row.ticketId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`edit-icon-${row.ticketId}`}
            placement="left"
          >
            Edit
          </UncontrolledTooltip>
          <IoTrashOutline
            className="delete-icon-style"
            onClick={(e) => handleDelete(e, row)}
            id={`delete-icon-${row.ticketId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`delete-icon-${row.ticketId}`}
            placement="left"
          >
            Delete
          </UncontrolledTooltip>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleButtonClick = (e, row) => {
    router("/Tickets/EditTicket", { state: row });
  };

  const handleDelete = async (e, row) => {
    try {
      const res = await TicketsApi.delete(row.ticketId);
      toast.success("Ticket Deleted Successfully");
      getTableData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later");
    }
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, status: e.target.innerText });
    setSelectedChoice(e.target.innerText);
    setIsValidStatus(true);
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await TicketsApi.getAll();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          ticketId: DataFormatter(item.ticketId),
          ticketName: DataFormatter(item.ticketName),
          ticketDescription: DataFormatter(item.ticketDescription),
          createdBy: DataFormatter(item.createdBy),
          createdAt: DataFormatter(item.createdAt),
          severity: DataFormatter(item.severity),
          status: DataFormatter(item.status),
        };
        return editedRow;
      });
      setTickets(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! Please try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Tickets" }));
    getTableData();
  }, []);

  const handleChangeStatus = async () => {
    try {
      setIsSubmiting(true);
      if (formData.status === "Status" || formData.status === "") {
        setIsValidStatus(false);
        setIsSubmiting(false);
        return;
      }
      await TicketsApi.updateStatus(formData.id, formData.status);
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
          Change Ticket Status
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
                  className="dropdown-style"
                >
                  <DropdownToggle caret className="dropdown-style">
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
        <>
          <div className="btns-container">
            <Button
              className="primary-btn-style"
              onClick={() => {
                router("/Tickets/AddTicket", { replace: true });
                dispatch(pageTitleCreator.change({ title: "Add New Ticket" }));
              }}
            >
              Add Ticket
            </Button>
          </div>
          <TableTemplate
            searchChoices={filters}
            columns={columns}
            data={tickets}
          />
        </>
      )}
    </div>
  );
};

export default TicketsList;
