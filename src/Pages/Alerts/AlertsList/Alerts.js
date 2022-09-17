import React, { useEffect, useState } from "react";
import "../Alerts.scss";
import TableTemplate from "../../../Components/Table/TableTemplate";
import { AlertsApi, CasesApi } from "../../../Api/AxiosApi";
import { DataFormatter } from "../../../Helpers/DataFormatter";
import Loading from "../../../Components/Loading/Loading";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
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
  UncontrolledTooltip,
} from "reactstrap";

const Alerts = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user).user;

  const [alerts, setAlerts] = useState([]);
  const choices = ["Alert Id", "Rule Name", "Severity", "Time", "Status"];
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [alertsForCases, setAlertForCases] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("Severity");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    severity: "",
    createdby: user.userName,
    associatedAlertsIds: "",
  });

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
            id={`edit-icon-${row.alertId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`edit-icon-${row.alertId}`}
            placement="left"
          >
            View
          </UncontrolledTooltip>
          <IoTrashOutline
            className="delete-icon-style"
            onClick={(e) => handleDelete(e, row)}
            id={`delete-icon-${row.alertId}`}
          />
          <UncontrolledTooltip
            autohide
            flip
            target={`delete-icon-${row.alertId}`}
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

  const handleDelete = async (e, row) => {
    //try {
    //   await UsersApi.deleteUser(row.userId);
    //   toast.success("User Deleted Successfully");
    //   getTableData();
    // } catch (error) {}
  };

  const handleButtonClick = (e, row) => {
    router("/Alerts/AlertDetails", { state: row.alertId });
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
    if (formData.description.length > 0) setIsValidDescription(true);
  }, [formData.description]);

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Alerts" }));
    getTableData();
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, severity: e.target.innerText });
    setSelectedChoice(e.target.innerText);
  };

  const handleSelectedRow = (state) => {
    setAlertForCases(state.selectedRows.map((item) => item.alertId));
  };

  const handleSubmitNewCase = async () => {
    try {
      setIsSubmiting(true);
      if (formData.description.length <= 0) {
        setIsValidDescription(false);
        setIsSubmiting(false);
        return;
      }
      formData.associatedAlertsIds = alertsForCases.join(",");
      await CasesApi.create(formData);
      toast.success("Case Created Successfully");
      setOpenModal(false);
    } catch (error) {
      toast.error("Something went wrong! please try again later");
      setIsSubmiting(false);
      setIsValidDescription(false);
      console.log(error);
      setOpenModal(false);
    }
  };

  return (
    <div className="content-container">
      <Modal toggle={() => setOpenModal(!openModal)} isOpen={openModal}>
        <ModalHeader toggle={() => setOpenModal(false)}>
          Request a new case
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
              <Input
                placeholder="Case Name"
                name="name"
                onChange={onChangeHandler}
              />
              <div>
                <Input
                  type="textarea"
                  placeholder="Description"
                  name="description"
                  onChange={onChangeHandler}
                  invalid={!isValidDescription}
                  valid={formData.description.length > 0}
                />
                <FormFeedback>Please Provide a description</FormFeedback>
              </div>
              <div>
                <Dropdown
                  isOpen={openDropdown}
                  toggle={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                  style={{ width: "100%" }}
                >
                  <DropdownToggle
                    caret
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {selectedChoice}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%" }}>
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      Severity
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      low
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      medium
                    </DropdownItem>
                    <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                      high
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="primary-btn-style"
            onClick={handleSubmitNewCase}
            disabled={isSubmiting}
          >
            Confirm
          </Button>
          <Button
            className="secondary-btn-style"
            onClick={() => {
              setIsValidDescription(true);
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
