import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux/Store/index";
import Cases from "./Pages/Cases/Cases";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Alerts from "./Pages/Alerts/Alerts";
import Settings from "./Pages/Settings/Settings";
import Tickets from "./Pages/Tickets/Tickets";
import Users from "./Pages/Users/Users";
import AddUser from "./Pages/Users/AddUser/AddUser";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Cases" element={<Cases />} />
            <Route path="/Alerts" element={<Alerts />} />
            <Route path="/Tickets" element={<Tickets />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/AddUser" element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
