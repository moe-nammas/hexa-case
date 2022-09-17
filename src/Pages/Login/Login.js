import React, { useState } from "react";
import "./Login.scss";
import logo from "../../Assets/Images/kytl-logo.png";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../../Redux/Actions/index";
import { UsersApi } from "../../Api/AxiosApi";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrors(null);
      setLoading(true);
      const res = await UsersApi.Login(formData);
      if (res.data === "invalid user") {
        setErrors({
          Invalid: "Invalid username or password",
        });
        setLoading(false);
      } else {
        dispatch(
          userActionCreator.login({
            token: res.data,
          })
        );
        router("/Dashboard", { replace: true });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong! try again later");
      setLoading(false);
      setErrors({
        failed: "Something went wrong! Please try again later ",
      });
      console.log(error);
    }
  };

  const handleUsername = (e) => {
    setFormData({
      ...formData,
      username: e.target.value,
    });
  };
  const handlePassword = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="white-rect">
        <div className="logo-container">
          <img src={logo} width="100%" height="100%" />
        </div>
        <label className="lbl-style">KYTL Case Management System</label>
        <Form>
          <FormGroup>
            <div className="form-container">
              <div className="inputs-container">
                <div className="input-container">
                  <Label className="lbl-style">Username</Label>
                  <Input
                    className="input"
                    onChange={(e) => handleUsername(e)}
                    disabled={loading}
                  />
                </div>
                <div className="input-container">
                  <Label className="lbl-style">password</Label>
                  <Input
                    className="input"
                    onChange={(e) => handlePassword(e)}
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>
              {errors && (
                <div className="validation-errors-container">
                  <Alert
                    color="danger"
                    style={{
                      padding: "0.5rem",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    {Object.keys(errors).map((item) => (
                      <p key={item} className="error-item">
                        {errors[item]}
                      </p>
                    ))}
                  </Alert>
                </div>
              )}
              <Button
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading ? <Loading padding={false} /> : "Login"}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default Login;
