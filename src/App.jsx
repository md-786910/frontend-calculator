import { useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
function App() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("access_token"));

  const Protected = () => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    Protected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
