import React from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Layout/Navbar";
import { useSelector } from "react-redux";
import MainContentContainer from "./Components/Layout/Main/MainContentContainer";
import { Toaster } from "react-hot-toast";

function App() {
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo);
  return (
    <div className="App">
      {userInfo.isAuthenticated && userInfo.user ? (
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
