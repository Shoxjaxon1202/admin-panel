import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { IoMdHome } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { IoLogoModelS } from "react-icons/io";

const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  return (

      <div className="menu_wrapper">
        <h2 className="menu_title">AvtozoomAdmin</h2>
        <div className="menu_cards">
          <div
            className={`menu_item ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleSetActive(0)}>
            <NavLink to="/dashboard" className="menu_link">
              <IoMdHome className="menu_icon" />
              <h4 className="menu_text">Dashboard</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleSetActive(1)}>
            <NavLink to="/settings" className="menu_link">
              <IoSettingsOutline className="menu_icon" />
              <h4 className="menu_text">Settings</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => handleSetActive(2)}>
            <NavLink to="/brands" className="menu_link">
              <BsShopWindow className="menu_icon" />
              <h4 className="menu_text">Brands</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 3 ? "active" : ""}`}
            onClick={() => handleSetActive(3)}>
            <NavLink to="/models" className="menu_link">
              <HiOutlineClipboardDocumentList className="menu_icon" />
              <h4 className="menu_text">Models</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 4 ? "active" : ""}`}
            onClick={() => handleSetActive(4)}>
            <NavLink to="/locations" className="menu_link">
              <FaMapLocationDot className="menu_icon" />
              <h4 className="menu_text">Locations</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 5 ? "active" : ""}`}
            onClick={() => handleSetActive(5)}>
            <NavLink to="/cities" className="menu_link">
              <PiBuildingApartmentFill className="menu_icon" />
              <h4 className="menu_text">Cities</h4>
            </NavLink>
          </div>
          <div
            className={`menu_item ${activeIndex === 6 ? "active" : ""}`}
            onClick={() => handleSetActive(6)}>
            <NavLink to="/cars" className="menu_link">
              <IoLogoModelS className="menu_icon" />
              <h4 className="menu_text">Cars</h4>
            </NavLink>
          </div>
        </div>
      </div>
  );
};

export default Menu;
