import React, { useEffect, useState } from "react";
import "./Alerts.scss";
import TableTemplate from "../../Components/Table/TableTemplate";
import { AlertsApi } from "../../Api/AxiosApi";
import { DataFormatter } from "../../Helpers/DataFormatter";
import Loading from "../../Components/Loading/Loading";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../Redux/Actions/index";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormFeedback,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const Alerts = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [alerts, setAlerts] = useState([]);
  const choices = ["Alert Id", "Rule Name", "Severity", "Time", "Status"];
  const [isLoading, setIsLoading] = useState(false);
  const [alertsForCases, setAlertForCases] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Severity");

  const columns = [
    {
      name: "Alert ID",
      sortable: true,
      selector: (row) => row.alertId,
    },
    {
      name: "Time",
      sortable: true,
      selector: (row) => row.timeStamp,
    },
    {
      name: "Rule Name",
      sortable: true,
      selector: (row) => row.ruleName,
    },
    {
      name: "Severity",
      sortable: true,
      selector: (row) => row.severity,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
    {
      cell: (row) => (
        <div className="table-icons-container">
          <AiOutlineEye
            className="edit-icon-style"
            onClick={(e) => handleButtonClick(e, row)}
          />
          <IoTrashOutline
            className="delete-icon-style"
            onClick={(e) => handleDelete(e, row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleDropdownChange = (e) => {
    setSelectedChoice(e.target.innerText);
  };

  const handleSelectedRow = (state) => {
    setAlertForCases(state.selectedRows.map((item) => item.alertId));
  };

  const handleDelete = async (e, row) => {
    //try {
    //   await UsersApi.deleteUser(row.userId);
    //   toast.success("User Deleted Successfully");
    //   getTableData();
    // } catch (error) {}
  };

  const handleButtonClick = (e, row) => {
    router("/AlertDetails", { state: row.alertId });
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await AlertsApi.getAlerts();
      const flattenedData = res.data.map((item) => {
        const editedRow = {
          ...item,
          alertId: DataFormatter(item.alertId),
          timeStamp: DataFormatter(item.timeStamp),
          ruleName: DataFormatter(item.ruleName),
          description: DataFormatter(item.description),
          severity: DataFormatter(item.severity),
          score: DataFormatter(item.score),
          agent: DataFormatter(item.agent),
          username: DataFormatter(item.username),
          hostIp: DataFormatter(item.hostIp),
          desinationIp: DataFormatter(item.desinationIp),
        };
        return editedRow;
      });
      setAlerts(flattenedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong! try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    if (description.length > 0) setIsValidDescription(true);
  }, [description]);

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Alerts" }));
    getTableData();
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitNewCase = () => {
    if (description.length <= 0) {
      setIsValidDescription(false);
      return;
    }
  };

  return (
    <div className="Alerts-container">
      <Modal toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
        <ModalHeader toggle={() => setOpenModal(false)}>
          Request a new case
        </ModalHeader>
        <ModalBody>
          <div className="modal-body-container">
            <div>
              Please Provide a description
              <Input
                type="textarea"
                placeholder="Description"
                onChange={(e) => handleDescriptionChange(e)}
                invalid={!isValidDescription}
                valid={description.length > 0}
              />
              <FormFeedback>Please Provide a description</FormFeedback>
            </div>
            <div className="dropdown-container">
              <Dropdown
                isOpen={openDropdown}
                toggle={() => {
                  setOpenDropdown(!openDropdown);
                }}
                className="dropdown-style"
              >
                <DropdownToggle caret>{selectedChoice}</DropdownToggle>
                <DropdownMenu className="dropdown-choices-container">
                  <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                    Severity
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                    Low
                  </DropdownItem>
                  <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                    Medium
                  </DropdownItem>
                  <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                    High
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="primary-btn-style" onClick={handleSubmitNewCase}>
            Confirm
          </Button>
          <Button
            className="secondary-btn-style"
            // color="danger"
            // outline
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!alertsForCases.length && (
            <div className="btns-container">
              <Button
                className="primary-btn-style"
                onClick={() => setOpenModal(!openModal)}
              >
                Case Request
              </Button>
            </div>
          )}
          <TableTemplate
            searchChoices={choices}
            columns={columns}
            data={alerts}
            multiSelection
            handleSelectedRow={handleSelectedRow}
          />
        </>
      )}
    </div>
  );
};

export default Alerts;
