import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "../stylesheets/todos.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }

      try {
        const response = await axios.post("http://127.0.0.1:8000/get-todos", {
          userId,
        });
        setTodos(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch todos.");
      }
    };

    fetchTodos();
  }, []);

  const toggleTodoStatus = async (_id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/update-status/${_id}`,
        { status: !currentStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === _id ? { ...todo, status: !currentStatus } : todo
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update todo status.");
    }
  };

  const deleteTodo = async (_id, currentStatus) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/delete-todo/${_id}`
      );
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update todo status.");
    }
  };

  return (
    <div className="todos-container">
      <div className="todos-box">
        {todos.map((todo) => (
          <Accordion
            key={todo._id}
            sx={{
              mb: 2,
              minHeight: "10vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: todo.status ? "rgba(104, 188, 125, 0.36)" : "white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id={`panel3-header-${todo._id}`}
            >
              <Typography component="span">
                <strong>{todo.title}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{todo.description}</AccordionDetails>
            <AccordionActions>
              <Button onClick={() => toggleTodoStatus(todo._id, todo.status)}>
                {todo.status ? "Undo" : "Complete"}
              </Button>
              <Button onClick={() => deleteTodo(todo._id)}>Remove</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Todos;
