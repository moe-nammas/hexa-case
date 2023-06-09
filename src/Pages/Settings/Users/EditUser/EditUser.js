import React, { useState } from "react";
import "../AddUser/AddUser.scss";
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
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageTitleCreator } from "../../../../Redux/Actions/index";
import { useEffect } from "react";
import { UsersApi } from "../../../../Api/AxiosApi";
import toast from "react-hot-toast";
import Loading from "../../../../Components/Loading/Loading";

const EditUser = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

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
        const res = await UsersApi.updateUser(userId, formData);
        toast.success("User Updated Successfully");
        setLoading(false);
        router("/Settings/Users/ViewUsers");
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
    dispatch(pageTitleCreator.change({ title: "Edit User" }));
    fillData();
  }, []);

  const fillData = async () => {
    if (id) {
      setUserId(id);
      const { data: res } = await UsersApi.getUserById(id);
      setFormData({
        name: res.name ?? "no data",
        username: res.username ?? "no data",
        email: res.email ?? "no data",
        phone: res.phone ?? "no data",
        role: res.role ?? "no data",
        permission: res.permission,
      });
      res.permission === 1
        ? setSelectedPermission("Admin")
        : setSelectedPermission("User");
    }
  };

  const handleBackBtn = () => {
    router(`/Settings/Users`);
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
    <div className="content-container">
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

export default EditUser;
