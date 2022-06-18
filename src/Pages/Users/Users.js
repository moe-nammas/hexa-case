import React, { useEffect, useState } from "react";
import "./Users.scss";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";
import TableTemplate from "../../Components/Table/TableTemplate";
import { UsersApi } from "../../Api/AxiosApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const filters = ["UserID", "Name", "Email", "Role", "Phone"];
  const columns = [
    {
      name: "ID",
      sortable: true,
      selector: (row) => row.userId,
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
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
  ];

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await UsersApi.getUsers();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          userId: DataFormatter(item.userID),
          name: DataFormatter(item.name),
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
    <div className="cases-container">
      {isLoading ? (
        <Loading />
      ) : (
        <TableTemplate searchChoices={filters} columns={columns} data={users} />
      )}
    </div>
  );
};

export default Users;
