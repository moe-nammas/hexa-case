import React, { useState, useEffect } from "react";
import Loading from "../../../Components/Loading/Loading";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import toast from "react-hot-toast";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import { TicketsApi } from "../../../Api/AxiosApi";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
      selector: (row) => row.ticketDesctiption,
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
  ];

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await TicketsApi.getAll();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          ticketId: DataFormatter(item.ticketId),
          ticketName: DataFormatter(item.ticketName),
          ticketDesctiption: DataFormatter(item.ticketDesctiption),
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
