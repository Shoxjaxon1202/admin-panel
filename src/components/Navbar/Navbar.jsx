import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CgMoveLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom"; // Sahifaga yo'naltirish uchun

import "./navbar.scss";

const Navbar = () => {
  const [isLogoutVisible, setLogoutVisible] = useState(false); // LogOut ni boshqarish uchun state
  const navigate = useNavigate(); // Yo'naltirish uchun hook

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // /login sahifasiga yo'naltirish
  };

  // Kartani ochib yopadigan toggle funksiyasi
  const handleToggleLogout = () => {
    setLogoutVisible((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar_wrapper">
        <div className="navbar_left">
          <button className="navbar_btn">
            <CgMoveLeft className="navbar_icon" />
          </button>
        </div>
        <div className="navbar_right" onClick={handleToggleLogout}>
          <CiUser />
          <h3 className="navbar_text">Admin</h3>
          {isLogoutVisible && (
            <div className="logout_card" onClick={handleLogout}>
              LogOut
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
