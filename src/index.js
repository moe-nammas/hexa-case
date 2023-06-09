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
import AddUser from "./Pages/Settings/Users/AddUser/AddEditUser";
import UsersList from "./Pages/Settings/Users/UsersList/UsersList";
import ViewAlertDetails from "./Pages/Alerts/AlertDetails/ViewAlertDetails";
import CaseDetails from "./Pages/Cases/CaseDetails/CaseDetails";
import CaseSettings from "./Pages/Settings/CaseSettings/CaseSettings";
import AlertsIndex from "./Pages/Alerts/AlertsIndex";
import CasesIndex from "./Pages/Cases/CasesIndex";
import SettingsIndex from "./Pages/Settings/SettingsIndex";
import UsersSettingsIndex from "./Pages/Settings/Users/UsersSettingsIndex";
import DashboardSettingsIndex from "./Pages/Settings/DashboardSettings/DashboardSettingsIndex";
import TicketsIndex from "./Pages/Tickets/TicketsIndex";
import TicketsList from "./Pages/Tickets/TicketsList/TicketsList";
import AddTicket from "./Pages/Tickets/AddTicket/AddTicket";
import EditTicket from "./Pages/Tickets/EditTicket/EditTicket";
import DashboardCustomization from "./Pages/Settings/DashboardSettings/DashboardCutomizations/DashboardCustomization";
import Roles from "./Pages/Settings/Roles/Roles";
import Permissions from "./Pages/Settings/Permissions/Permissions";
import EditUser from "./Pages/Settings/Users/EditUser/EditUser";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Cases" element={<CasesIndex />}>
            <Route path="/Cases" element={<Cases />}></Route>
            <Route path="/Cases/:id" element={<CaseDetails />} />
          </Route>
          <Route path="/Alerts" element={<AlertsIndex />}>
            <Route path="/Alerts/" element={<Alerts />} />
            <Route path="/Alerts/:id" element={<ViewAlertDetails />} />
          </Route>
          <Route path="/Tickets" element={<TicketsIndex />}>
            <Route path="/Tickets" element={<TicketsList />} />
            <Route path="/Tickets/AddTicket" element={<AddTicket />} />
            <Route path="/Tickets/EditTicket" element={<EditTicket />} />
          </Route>
          <Route path="/Settings" element={<SettingsIndex />}>
            <Route path="/Settings/AllSettings" element={<Settings />} />
            <Route path="/Settings/Users" element={<UsersSettingsIndex />}>
              <Route path="/Settings/Users" element={<UsersList />} />
              <Route path="/Settings/Users/AddUser" element={<AddUser />} />
              <Route path="/Settings/Users/:id" element={<EditUser />} />
            </Route>
            <Route path="/Settings/CaseSettings" element={<CaseSettings />} />
            <Route
              path="/Settings/DashboardSettings"
              element={<DashboardSettingsIndex />}
            >
              <Route
                path="/Settings/DashboardSettings/Customizations"
                element={<DashboardCustomization />}
              />
            </Route>
            <Route path="/Settings/Roles" element={<Roles />} />
            <Route path="/Settings/Permissions" element={<Permissions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
