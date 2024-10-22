import React, { useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";
import Display from "../Display/Display";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "../../Router/Router";
import Footer from "../Footer/Footer";

import "./layout.scss";
import Login from "../../Login";
const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token]);

  const body = () => {
    if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
      return (
        <>
          <div className="main__container">
            <aside className="menu">
              <Menu />
            </aside>
            <div className="second__container">
              <Navbar />
              <div className="router">
                <Router />
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      );
    }
  };

  return (
    <div>
      <ToastContainer className="toastify" />
      {body()}
    </div>
  );
};

export default Layout;
