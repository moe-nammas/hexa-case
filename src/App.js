import "./App.css";
import Login from "./Pages/Login/Login";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import MainContentContainer from "./Components/Layout/Main/MainContentContainer";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="./Home" element={<Navbar />} />
        </Routes>
        <Navbar>
          <MainContentContainer />
        </Navbar>
      </div>
    </>
  );
}

export default App;
