import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Alert,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { TicketsApi } from "../../../Api/AxiosApi";

const AddTicket = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [selectedSeverity, setSelectedSeverity] = useState("Severity");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    ticketName: "",
    ticketDescription: "",
  });
  const [formData, setFormData] = useState({
    ticketName: "",
    ticketDescription: "",
    severity: "",
    createdBy: user.userName,
  });
  const [openSeverityDropdown, setOpenSeverityDropdown] = useState(false);

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropDownChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.innerText,
    });
  };

  useEffect(() => {
    dispatch(pageTitleCreator.change({ title: "Add New Ticket" }));
  }, []);

  const validate = () => {
    let tempErrors = {
      ticketName: "",
      ticketDescription: "",
    };

    if (!formData.ticketName) {
      tempErrors.ticketName = "Please provide a name";
    }
    if (!formData.ticketDescription) {
      tempErrors.description = "Please provide a desciption";
    }

    setErrors(tempErrors);

    if (tempErrors.ticketName || tempErrors.ticketDescription) return false;
    return true;
  };

  const onSubmitHandler = async () => {
    try {
      setLoading(true);
      if (validate()) {
        const res = await TicketsApi.post(formData);
        toast.success("Ticket Added Successfully");
        router("/Tickets/ViewTickets");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later");
      setLoading(false);
    }
  };

  return (
    <div className="content-container">
      <Form className="form-container-style">
        <div className="inputs-container">
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label>Ticket Name</Label>
              <Input
                placeholder="e.g. Maintenance, Installation..."
                type="text"
                name="ticketName"
                defaultValue={formData.name}
                onChange={(e) => handleChange(e)}
                invalid={errors.ticketName}
              />
              <FormFeedback>{errors.ticketName}</FormFeedback>
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="permission">Severity</Label>
              <Dropdown
                className="form-dropdown-style"
                isOpen={openSeverityDropdown}
                toggle={() => {
                  setOpenSeverityDropdown(!openSeverityDropdown);
                }}
              >
                <DropdownToggle caret className="dropdown-style">
                  {selectedSeverity}
                </DropdownToggle>
                <DropdownMenu className="form-dropdown-style">
                  <DropdownItem
                    accessKey={0}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedSeverity("permission");
                    }}
                    name="permission"
                  >
                    Severity
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    accessKey={1}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedSeverity("high");
                    }}
                    name="severity"
                  >
                    high
                  </DropdownItem>
                  <DropdownItem
                    accessKey={2}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedSeverity("medium");
                    }}
                    name="severity"
                  >
                    medium
                  </DropdownItem>
                  <DropdownItem
                    accessKey={2}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedSeverity("low");
                    }}
                    name="severity"
                  >
                    low
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label>Description</Label>
              <Input
                name="ticketDescription"
                placeholder="Please Enter Ticket Description"
                type="textarea"
                defaultValue={formData.role}
                onChange={(e) => handleChange(e)}
                invalid={errors.description}
              />
              <FormFeedback>{errors.description}</FormFeedback>
            </div>
          </FormGroup>
        </div>
        <div className="form-btn-container-style">
          <Button
            className="form-back-btn-style"
            onClick={() => router("/Tickets/ViewTickets")}
            disabled={loading}
          >
            {loading ? <Loading /> : "Back"}
          </Button>
          <Button
            className="form-submit-btn-style"
            onClick={onSubmitHandler}
            disabled={loading}
          >
            {loading ? <Loading /> : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTicket;
