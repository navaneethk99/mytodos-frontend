import React, { useState, useEffect } from "react";
import "../stylesheets/profile.css";
import { useNavigate } from "react-router-dom";
import api from "../api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      const fetchUsername = async () => {
        try {
          const response = await api.get(`/get-username/${storedUserId}`);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Failed to fetch username:", error);
          navigate("/");
        }
      };
      fetchUsername();
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill in both old and new passwords");
      return;
    }

    try {
      const response = await api.put(
        `/edit-password/${userId}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Password updated successfully") {
        alert("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await api.put(
        `/edit-username/${userId}`,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Username updated successfully");
    } catch (err) {
      console.error("Error updating username:", err);
      alert("Failed to update username");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="avatar-container">
          <img
            src="/images/avatar.svg"
            style={{ height: "15vh" }}
            alt="avatar"
          />
        </div>
        <div className="profile-edit-container">
          <label>Edit Username</label>
          <input
            className="profile-edit-textbox"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label style={{ marginTop: "2.5vh" }}>Old Password</label>
          <input
            className="profile-edit-textbox"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <label style={{ marginTop: "1vh" }}>New Password</label>
          <input
            className="profile-edit-textbox"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div className="profile-update-button-container">
            <button
              id="profile-update-button"
              style={{
                marginTop: "2vh",
                height: "6vh",
                width: "40vw",
                backgroundColor: "rgb(0, 79, 0)",
              }}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>

            <button
              id="profile-update-button"
              style={{
                marginTop: "2vh",
                height: "6vh",
                width: "40vw",
                backgroundColor: "rgb(0, 79, 0)",
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
