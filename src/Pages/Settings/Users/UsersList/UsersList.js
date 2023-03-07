import React, { useEffect, useState, useMemo } from "react";
import "./UsersList.scss";
import { DataFormatter } from "../../../../Helpers/DataFormatter";
import Loading from "../../../../Components/Loading/Loading";
import TableTemplate from "../../../../Components/Table/TableTemplate";
import { actionsApi, UsersApi } from "../../../../Api/AxiosApi";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { Button, UncontrolledTooltip,Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../../Redux/Actions/index";
import toast from "react-hot-toast";
import TableModal from "../../../../Components/Modals/AttackedAssetsModal/TableModal";
import { ColorResolver } from "../../../../Helpers/ColorResolver";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [userActions, setUserActions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);
  const [logDataLoading, setLogDataLoading] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();

  const filters = ["User ID", "Name", "Email", "Role", "Phone"];
  const columns = useMemo(() => [
    {
      name: "ID",
      sortable: true,
      selector: (row) => row.userId,
    },
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Username",
      sortable: true,
      selector: (row) => row.username,
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Role",
      sortable: true,
      selector: (row) => row.role,
    },
    {
      cell: (row) => (
        <div className="table-icons-container">
          <BiEdit
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
            id={`edit-icon-${row.userID}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`edit-icon-${row.userID}`}
            placement="left"
          >
            Edit
          </UncontrolledTooltip>
          <RiFileListLine
            className="edit-icon-style"
            onClick={(e) => handleOpenModal(row.userID)}
            id={`log-icon-${row.userID}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`log-icon-${row.userID}`}
            placement="left"
          >
            Users log
          </UncontrolledTooltip>
          <IoTrashOutline
            className="delete-icon-style"
            onClick={(e) => handleDelete(e, row)}
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
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);
  const userLogColumns = useMemo(() => [
    {
      name: "Action ID",
      sortable: true,
      selector: (row) => row.actionId,
    },
    {
      name: "type",
      sortable: true,
      selector: (row) => row.type,
      cell: (row) => (
        <Badge pill className={`${
          ColorResolver(row.type) === "warning" ? "text-dark" : ""
        }`} color={`${ColorResolver(row.type)}`}>
          {row.type}
        </Badge>
      ),
    },
    {
      name: "action",
      sortable: true,
      selector: (row) => row.action,
    },
    {
      name: "createdAt",
      sortable: true,
      selector: (row) => row.createdAt,
    },
  ]);

  const handleDelete = async (e, row) => {
    try {
      await UsersApi.deleteUser(row.userId);
      toast.success("User Deleted Successfully");
      getTableData();
    } catch (error) {}
  };

  const handleButtonClick = (e, row) => {
    router("/Settings/Users/EditUser", { state: row });
  };

  const handleOpenModal = async (userId) => {
    try {
      setOpenLogModal(true);
      setLogDataLoading(true);
      const { data } = await actionsApi.get(userId);
      const flattenedData = data.map((item) => {
        const editedRow = {
          ...item,
          actionId: DataFormatter(item.actionId),
          type: DataFormatter(item.type),
          action: DataFormatter(item.action),
          createdAt: DataFormatter(item.createdAt),
        };
        return editedRow;
      });
      setUserActions(flattenedData);
      setLogDataLoading(false);
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong! please try again later");
    }
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await UsersApi.getUsers();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          userId: DataFormatter(item.userID),
          name: DataFormatter(item.name),
          username: DataFormatter(item.username),
          email: DataFormatter(item.email),
          phone: DataFormatter(item.phone),
          role: DataFormatter(item.role),
        };
        return editedRow;
      });
      setUsers(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="content-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TableModal
            openModal={openLogModal}
            setOpenModal={setOpenLogModal}
            data={userActions}
            isLoading={logDataLoading}
            columns={userLogColumns}
            header={"User Actions Log"}
          />
          <div className="btns-container">
            <Button
              className="primary-btn-style"
              onClick={() => {
                router("/Settings/Users/AddUser", { replace: true });
                dispatch(pageTitleCreator.change({ title: "Add New User" }));
              }}
            >
              Add User
            </Button>
          </div>
          <TableTemplate
            searchChoices={filters}
            columns={columns}
            data={users}
          />
        </>
      )}
    </div>
  );
};

export default UsersList;
