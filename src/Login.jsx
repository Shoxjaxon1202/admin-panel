import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./login.scss";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginApi = `https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin`;

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data?.data?.tokens?.accessToken?.token;

        if (token) {
          localStorage.setItem("token", token);
          toast.success("You are logged in successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error("Sign-in failed");
        }
      } else {
        const errorData = await response.json();
        toast.error("Sign-in failed");
      }
    } catch (error) {
      toast.error("System error");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="login_wrapper">
        <ToastContainer />
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_box">
            <CiUser className="login_icon" />
            <input
              type="text"
              className="login_input"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="login_box">
            <RiLockPasswordLine className="login_icon" />
            <input
              type="password"
              className="login_input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button className="login_btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
