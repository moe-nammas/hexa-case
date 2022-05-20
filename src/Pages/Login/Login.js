import React, { useState } from "react";
import "./Login.scss";
import logo from "../../Assets/Images/kytl-logo.png";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
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
                    valid={username.length > 0 ? true : false}
                    onChange={(e) => handleUsername(e)}
                  />
                  <FormFeedback>You will not be able to see this</FormFeedback>
                </div>
                <div className="input-container">
                  <Label className="lbl-style">password</Label>
                  <Input
                    className="input"
                    onChange={(e) => handlePassword(e)}
                    valid={password.length > 0 ? true : false}
                    type="password"
                  />
                  <FormFeedback>You will not be able to see this</FormFeedback>
                </div>
              </div>
              <Button
                // type="submit"
                color="primary"
                outline
                // onSubmit={handleSubmit}
                onClick={() => router("/Main/Dashboard", { replace: true })}
              >
                Login
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default Login;
