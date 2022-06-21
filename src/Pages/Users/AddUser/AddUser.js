import React, { useState } from "react";
import "./AddUser.scss";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";

const AddUser = () => {
  const [openPermssionsDropdown, setOpenPermssionsDropdown] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("Permissions");

  const router = useNavigate();
  const dispatch = useDispatch();

  const handleDropdownChange = (e) => {
    setSelectedPermission(e.target.innerText);
  };

  const handleSubmit = () => {
    console.log("first");
  };

  const handleBackBtn = () => {
    router(`/Users`);
    dispatch(pageTitleCreator.change({ title: "Users" }));
  };

  return (
    <div className="add-user-container">
      <Form className="form-container-style">
        <div className="inputs-container">
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="name">Name</Label>
              <Input name="name" placeholder="Name" type="text" />
            </div>
            <div className="form-label-input-container">
              <Label for="userName">User Name</Label>
              <Input name="userName" placeholder="User Name" type="text" />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="password">Password</Label>
              <Input name="password" placeholder="Password" type="password" />
            </div>
            <div className="form-label-input-container">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                name="confrimPassword"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="email">Email</Label>
              <Input name="email" placeholder="Email" type="email" />
            </div>
            <div className="form-label-input-container">
              <Label for="phone">Phone</Label>
              <Input name="phone" placeholder="Phone" type="text" />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label>Role</Label>
              <Input name="role" placeholder="Role" type="text" />
            </div>
            <div className="form-label-input-container">
              <Label for="permission">Permissions</Label>
              <Dropdown
                className="form-dropdown-style"
                isOpen={openPermssionsDropdown}
                toggle={() => {
                  setOpenPermssionsDropdown(!openPermssionsDropdown);
                }}
              >
                <DropdownToggle caret className="dropdown-style">
                  {selectedPermission}
                </DropdownToggle>
                <DropdownMenu className="form-dropdown-style">
                  <DropdownItem onClick={(e) => handleDropdownChange(e)}>
                    Permissions
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    key="1"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem
                    key="2"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    User
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </FormGroup>
        </div>
        <div className="form-btn-container-style">
          <Button className="form-back-btn-style" onClick={handleBackBtn}>
            Back
          </Button>
          <Button className="form-submit-btn-style" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
