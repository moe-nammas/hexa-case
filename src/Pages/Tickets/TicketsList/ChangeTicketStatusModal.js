import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Loading from "../../../Components/Loading/Loading";
import { TicketsApi } from "../../../Api/AxiosApi";
import toast from "react-hot-toast";

const ChangeTicketStatusModal = ({
  openModal,
  setOpenModal,
  ticketId,
  getTableData,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Status");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formData, setFormData] = useState({
    id: ticketId,
    status: "",
  });

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, status: e.target.innerText });
    setSelectedChoice(e.target.innerText);
    setIsValidStatus(true);
  };

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

  useEffect(() => {}, []);

  return (
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
                <DropdownMenu
                  className="dropdown-choices-container"
                  style={{ width: "100%" }}
                >
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
  );
};

export default ChangeTicketStatusModal;
