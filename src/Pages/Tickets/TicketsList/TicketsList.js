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
  Badge,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdOutlineRotateLeft } from "react-icons/md";
import { isAuthorized } from "../../../Helpers/Premissions";
import { ColorResolver } from "../../../Helpers/ColorResolver";
import ChangeTicketStatusModal from "./ChangeTicketStatusModal";

const TicketsList = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTicketId, setSelectedTicketId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
      name: "status",
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
      cell: (row) =>
        isAuthorized(1, 2) && (
          <div className="table-icons-container">
            {row.status !== "closed" ? (
              <>
                <MdOutlineRotateLeft
                  className="edit-icon-style"
                  id={`status-icon-${row.ticketId}`}
                  onClick={() => {
                    setSelectedTicketId(row.ticketId);
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

  const getTableData = async () => {
    try {
      console.log("first");
      setIsLoading(true);
      const { data: res } = await TicketsApi.getAll(
        limit,
        limit * (currentPage - 1)
      );
      setTotal(res.total);
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
  }, [limit, currentPage]);

  return (
    <div className="content-container">
      {openModal && (
        <ChangeTicketStatusModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          ticketId={selectedTicketId}
          getTableData={getTableData}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isAuthorized(1, 2) && (
            <div className="btns-container">
              <Button
                className="primary-btn-style"
                onClick={() => {
                  router("/Tickets/AddTicket", { replace: true });
                  dispatch(
                    pageTitleCreator.change({ title: "Add New Ticket" })
                  );
                }}
              >
                Add Ticket
              </Button>
            </div>
          )}
          <TableTemplate
            searchChoices={filters}
            columns={columns}
            data={tickets}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
            currentPage={currentPage}
            total={total}
            rowsPerPage={limit}
          />
        </>
      )}
    </div>
  );
};

export default TicketsList;
