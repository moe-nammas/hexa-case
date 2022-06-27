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
  Alert,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../Redux/Actions/index";
import { useEffect } from "react";
import { UsersApi } from "../../../Api/AxiosApi";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";

const AddEditUser = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [openPermssionsDropdown, setOpenPermssionsDropdown] = useState(false);
  const [userId, setUserId] = useState(0);
  const [selectedPermission, setSelectedPermission] = useState("Permissions");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "",
    permission: 0,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors(null);
      const isValidData = validateData();
      if (isValidData) {
        if (userId !== 0) {
          const res = await UsersApi.updateUser(userId, formData);
          toast.success("User Updated Successfully");
          setLoading(false);
          router("/Users");
        } else {
          const res = await UsersApi.createUser(formData);
          toast.success("User Added Successfully");
          setLoading(false);
          router("/Users");
        }
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong please try again later");
    }
  };

  const validateData = () => {
    let valid = true;
    console.log(formData.name.length);
    if (formData.name.length === 0) {
      setErrors({
        ...errors,
        name: "Name field is empty!",
      });
      valid = false;
    }
    if (formData.password !== confirmPassword) {
      setErrors({
        ...errors,
        password: "Password & Confirm Password Don't match!",
      });
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    changeTitle();
    fillData();
  }, []);

  const changeTitle = () => {
    state
      ? dispatch(pageTitleCreator.change({ title: "Edit User" }))
      : dispatch(pageTitleCreator.change({ title: "Add New User" }));
  };

  const fillData = () => {
    if (state) {
      setUserId(state.userId);
      setFormData({
        name: state.name ?? "no data",
        username: state.username ?? "no data",
        email: state.email ?? "no data",
        phone: state.phone ?? "no data",
        role: state.role ?? "no data",
        permission: state.permission,
      });
      console.log(state.permission);
      state.permission == 1
        ? setSelectedPermission("Admin")
        : setSelectedPermission("User");
    }
  };

  const handleBackBtn = () => {
    router(`/Users`);
    dispatch(pageTitleCreator.change({ title: "Users" }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropDownChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.accessKey,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="add-user-container">
      <Form className="form-container-style">
        <div className="inputs-container">
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label>Name</Label>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-label-input-container">
              <Label for="userName">User Name</Label>
              <Input
                name="username"
                placeholder="User Name"
                type="text"
                defaultValue={formData.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="password">Password</Label>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-label-input-container">
              <Label>Confirm Password</Label>
              <Input
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => handleConfirmPasswordChange(e)}
              />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label for="email">Email</Label>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                defaultValue={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-label-input-container">
              <Label for="phone">Phone</Label>
              <Input
                name="phone"
                placeholder="Phone"
                type="text"
                defaultValue={formData.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </FormGroup>
          <FormGroup className="row-container-form-style">
            <div className="form-label-input-container">
              <Label>Role</Label>
              <Input
                name="role"
                placeholder="Role"
                type="text"
                defaultValue={formData.role}
                onChange={(e) => handleChange(e)}
              />
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
                  <DropdownItem
                    accessKey={0}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedPermission("permission");
                    }}
                    name="permission"
                  >
                    Permissions
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    accessKey={1}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedPermission("Admin");
                    }}
                    name="permission"
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem
                    accessKey={2}
                    onClick={(e) => {
                      handleDropDownChange(e);
                      setSelectedPermission("User");
                    }}
                    name="permission"
                  >
                    User
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </FormGroup>
        </div>
        {errors && (
          <div className="validation-errors-container">
            <Alert color="danger" className="error-style">
              <h4>Validation Errors: </h4>
              <hr className="divider-style" />
              {Object.keys(errors).map((item) => (
                <p key={item}>
                  -{item}: {errors[item]}
                </p>
              ))}
            </Alert>
          </div>
        )}
        <div className="form-btn-container-style">
          <Button
            className="form-back-btn-style"
            onClick={handleBackBtn}
            disabled={loading}
          >
            {loading ? <Loading /> : "Back"}
          </Button>
          <Button
            className="form-submit-btn-style"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loading /> : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditUser;
