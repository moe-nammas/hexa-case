import React, { useEffect, useState, useMemo } from "react";
import "./Roles.scss";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { Button, UncontrolledTooltip, Badge } from "reactstrap";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import toast from "react-hot-toast";
import { rolesApi } from "../../../Api/AxiosApi";
import NewRoleModal from "./NewRoleModal";

const RolesAndPermissions = () => {
  const dispatch = useDispatch();
  
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const filters = ["Role ID", "Name", "Created at", "Updateat"];
  const columns = useMemo(() => [
    {
      name: "id",
      sortable: true,
      selector: (row) => row.roleId,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.roleName,
    },
    {
      name: "Created at",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Update at",
      sortable: true,
      selector: (row) => row.updatedAt,
    },
    // {
    //   cell: (row) => (
    //     <div className="table-icons-container">
    //       <BiEdit
    //         className="edit-icon-style"
    //         onClick={(e) => handleButtonClick(e, row)}
    //         id={`edit-icon-${row.userID}`}
    //       />
    //       <UncontrolledTooltip
    //         autohide
    //         flip
    //         target={`edit-icon-${row.userID}`}
    //         placement="left"
    //       >
    //         Edit
    //       </UncontrolledTooltip>
    //       <RiFileListLine
    //         className="edit-icon-style"
    //         onClick={(e) => handleOpenModal(row.userID)}
    //         id={`log-icon-${row.userID}`}
    //       />
    //       <UncontrolledTooltip
    //         autohide
    //         flip
    //         target={`log-icon-${row.userID}`}
    //         placement="left"
    //       >
    //         Users log
    //       </UncontrolledTooltip>
    //       <IoTrashOutline
    //         className="delete-icon-style"
    //         onClick={(e) => handleDelete(e, row)}
    //         id={`delete-icon-${row.userID}`}
    //       />
    //       <UncontrolledTooltip
    //         autohide
    //         flip
    //         target={`delete-icon-${row.userID}`}
    //         placement="left"
    //       >
    //         Delete
    //       </UncontrolledTooltip>
    //     </div>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ]);

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const { data: res } = await rolesApi.get(
        limit,
        limit * (currentPage - 1)
      );
      setTotal(res.total);
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          roleId: DataFormatter(item.roleId),
          roleName: DataFormatter(item.roleName),
          createdAt: DataFormatter(item.createdAt),
          updatedAt: DataFormatter(item.updatedAt),
        };
        return editedRow;
      });
      setRoles(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Roles" }));
    getTableData();
  }, [limit, currentPage]);

  return (
    <div className="content-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NewRoleModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            getTableData={getTableData}
          />
          <div className="btns-container">
            <Button
              className="primary-btn-style"
              onClick={() => {
                setOpenModal(true)
              }}
            >
              Add Roles
            </Button>
          </div>
          <TableTemplate
            searchChoices={filters}
            columns={columns}
            data={roles}
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

export default RolesAndPermissions;
