import "./App.css";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Layout/Navbar";
import MainContentContainer from "./Components/Layout/Main/MainContentContainer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const userInfo = useSelector((state) => state.user);

  return (
    <div className="App">
      {!userInfo.isAuthenticated && <Login />}
      {userInfo.isAuthenticated && (
        <Navbar>
          <MainContentContainer />
        </Navbar>
      )}
    </div>
  );
}

export default App;
