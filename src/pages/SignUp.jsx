import React, { useState } from "react";
import "../stylesheets/login.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleSignup = async () => {
    setClicked(true);
    try {
      const response = await api.post("/sign-up", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/app/add");
      } else {
        setClicked(false);
        alert("Signup failed: " + response.data.message);
      }
    } catch (err) {
      setClicked(false);
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
            <button
              className="login-buttons"
              onClick={handleSignup}
              disabled={clicked}
            >
              {clicked ? "Creating Account..." : "Sign Up"}
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
