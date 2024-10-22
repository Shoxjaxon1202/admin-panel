import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import { useNavigate, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Layout/>
    </div>
  );
}

export default App;
