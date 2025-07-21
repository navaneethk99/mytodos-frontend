import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import "../stylesheets/addtodo.css";

const AddTodo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(false);

  const handlePostingTodo = async () => {
    setClicked(true);
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in.");
        return;
      }

      const response = await api.post("/create-todo", {
        userId,
        title,
        description,
        status: false,
      });

      if (response.data.success) {
        alert("Todo added!");
        setClicked(false);
        navigate("/app/add"); // or navigate("/app/home") depending on your routing
      } else {
        alert("Failed to add todo: " + response.data.message);
        setClicked(false);
      }
    } catch (err) {
      console.error(err);
      alert("Todo creation failed due to server error.");
      setClicked(false);
    }
  };

  return (
    <div className="addtodo-container">
      <div className="addtodo-box">
        <label
          style={{
            fontWeight: "bold",
            fontSize: "3vh",
            color: "rgb(0, 79, 0)",
          }}
        >
          Add To-Do
        </label>
        <div className="addtodo-body">
          <label>Title</label>
          <input
            id="addtodo-title-textbox"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label style={{ marginTop: "1vh" }}>Description</label>
          <textarea
            id="addtodo-desc-textbox"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="addtodo-button-container">
            <button
              id="profile-update-button"
              disabled={clicked}
              style={{
                marginTop: "1vh",
                height: "6vh",
                width: "40vw",
                backgroundColor: "rgb(0, 79, 0)",
              }}
              onClick={handlePostingTodo}
            >
              {clicked ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
