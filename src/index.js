import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux/Store/index";
import Cases from "./Pages/Cases/CasesList/Cases";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Alerts from "./Pages/Alerts/AlertsList/Alerts";
import Settings from "./Pages/Settings/AllSettings/Settings";
import Tickets from "./Pages/Tickets/Tickets";
import AddEditUser from "./Pages/Settings/Users/AddUser/AddEditUser";
import UsersList from "./Pages/Settings/Users/UsersList/UsersList";
import ViewAlertDetails from "./Pages/Alerts/AlertDetails/ViewAlertDetails";
import CaseDetails from "./Pages/Cases/CaseDetails/CaseDetails";
import CaseSettings from "./Pages/Settings/CaseSettings/CaseSettings";
import AlertsIndex from "./Pages/Alerts/AlertsIndex";
import CasesIndex from "./Pages/Cases/CasesIndex";
import SettingsIndex from "./Pages/Settings/SettingsIndex";
import UsersSettingsIndex from "./Pages/Settings/Users/UsersSettingsIndex";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Cases" element={<CasesIndex />}>
            <Route path="/Cases/ViewCases" element={<Cases />}></Route>
            <Route path="/Cases/CaseDetails" element={<CaseDetails />} />
          </Route>
          <Route path="/Alerts" element={<AlertsIndex />}>
            <Route path="/Alerts/ViewAlerts" element={<Alerts />}></Route>
            <Route path="/Alerts/AlertDetails" element={<ViewAlertDetails />} />
          </Route>
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Settings" element={<SettingsIndex />}>
            <Route path="/Settings/AllSettings" element={<Settings />} />
            <Route path="/Settings/Users" element={<UsersSettingsIndex />}>
              <Route path="/Settings/Users/ViewUsers" element={<UsersList />} />
              <Route path="/Settings/Users/AddUser" element={<AddEditUser />} />
              <Route
                path="/Settings/Users/EditUser"
                element={<AddEditUser />}
              />
            </Route>
            <Route path="/Settings/CaseSettings" element={<CaseSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
