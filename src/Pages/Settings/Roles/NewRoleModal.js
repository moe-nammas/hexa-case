import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { rolesApi } from "../../../Api/AxiosApi";
import Loading from "../../../Components/Loading/Loading";
import { useSelector } from "react-redux";

const NewRoleModal = ({ openModal, setOpenModal, getTableData }) => {
  const user = useSelector((state) => state.user).user;
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    createdBy: user.userID,
  });

  const handleInputChange = (e) => {
    setShowErrorMessage(false);
    setNewRole({ ...newRole, name: e.target.value });
  };
  const isValid = () => {
    return newRole.name !== "" && newRole.name.length > 0;
  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (isValid()) {
        const newRoleRes = await rolesApi.post(newRole);
        toast.success("New role had been added successfully");
        getTableData();
        setIsLoading(false);
        setOpenModal(false);
      } else {
        setShowErrorMessage(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong! Please try again later");
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <Modal size="sm" toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
      <ModalHeader toggle={() => setOpenModal(false)}>New Role</ModalHeader>
      <ModalBody
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <label>Role name</label>
        <Input
          onChange={(e) => handleInputChange(e)}
          invalid={showErrorMessage}
        />
        <FormFeedback>Role name is required</FormFeedback>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          className="primary-btn-style"
        >
          {isLoading ? (
            <Loading
              style={{ width: "1.5rem", height: "1.5rem" }}
              padding={false}
            />
          ) : (
            "Save"
          )}
        </Button>
        <Button
          onClick={() => setOpenModal(false)}
          className="secondary-btn-style"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loading
              style={{ width: "1.5rem", height: "1.5rem" }}
              padding={false}
            />
          ) : (
            "Cancel"
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewRoleModal;
