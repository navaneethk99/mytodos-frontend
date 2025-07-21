import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import "../stylesheets/login.css";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/sign-in", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/app/add");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed due to network/server error.");
    }
  };
  const handleSwitch = () => {
    navigate("/signup");
  };
  return (
    <>
      <div className="login-container">
        <div className="logo-container">
          <img
            src="/images/mytodos alt logo.png"
            style={{ height: "100%", width: "100%" }}
          ></img>
        </div>
        <div className="login-box">
          <div className="login-title">Login</div>
          <div className="login-body">
            <label>Username</label>
            <input
              className="login-text-boxes"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              className="login-text-boxes"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-buttons-container">
              <button className="login-buttons" onClick={handleLogin}>
                Sign In
              </button>
            </div>
            <div className="switch-login-signup" onClick={handleSwitch}>
              Do Not Have an Account? <b>Register</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
