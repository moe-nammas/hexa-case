import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Layout/Navbar";
import { useSelector } from "react-redux";
import MainContentContainer from "./Components/Layout/Main/MainContentContainer";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userActionCreator } from "./Redux/Actions/index";

function App() {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      const username = localStorage.getItem("userName");
      const perm = 1;
      dispatch(
        userActionCreator.login({
          userName: username,
          permission: perm,
        })
      );
    }
  }, []);

  window.addEventListener("beforeunload", (e) => {
    localStorage.clear();
    console.log(e);
  });

  return (
    <div className="App">
      {userInfo.isAuthenticated &&
      localStorage.getItem("isAuthenticated") === "true" ? (
        <>
          <Navbar />
          <MainContentContainer />
          <Toaster position="top-center" reverseOrder={false} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
