import React, { useState, useEffect } from "react";
import Loading from "../../../Components/Loading/Loading";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import toast from "react-hot-toast";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import { TicketsApi } from "../../../Api/AxiosApi";
import { Button, UncontrolledTooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";

const TicketsList = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      cell: (row) => (
        <div className="table-icons-container">
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

  return (
    <div className="content-container">
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
