import React, { useState } from "react";
import "../stylesheets/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/sign-up", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/app/add");
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed due to network/server error.");
    }
  };

  const handleSwitch = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src="/images/mytodos alt logo.png"
          style={{ height: "100%", width: "100%" }}
          alt="logo"
        />
      </div>
      <div className="login-box">
        <div className="login-title">Sign Up</div>
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
            <button className="login-buttons" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
          <div className="switch-login-signup" onClick={handleSwitch}>
            Already Have an Account? <b>Login</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
