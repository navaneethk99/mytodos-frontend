import React, { useEffect, useState } from "react";
import api from "../api";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import "../stylesheets/todos.css";

const Todos = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }

      try {
        const response = await api.post("/get-todos", { userId });
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
      await api.put(
        `/update-status/${_id}`,
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

  const deleteTodo = async (_id) => {
    try {
      await api.delete(`/delete-todo/${_id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      alert("Failed to delete todo.");
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status ? 1 : -1; // completed goes last
    }
    return dayjs(a.datetime).isAfter(dayjs(b.datetime)) ? 1 : -1; // earliest deadline first
  });

  return (
    <div className="todos-container">
      <div className="todos-box">
        {sortedTodos.map((todo) => {
          const isOverdue = dayjs().isAfter(
            dayjs.utc(todo.datetime).tz("Asia/Kolkata")
          );
          const bgColor = todo.status
            ? "rgba(104, 188, 125, 0.36)" // green if complete
            : isOverdue
            ? "rgba(255, 0, 0, 0.2)" // red if overdue
            : "white"; // default

          return (
            <Accordion
              key={todo._id}
              sx={{
                mb: 2,
                minHeight: "10vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: bgColor,
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
              <AccordionDetails sx={{ color: "rgba(8, 104, 8, 1)" }}>
                <strong>
                  {dayjs
                    .utc(todo.datetime)
                    .tz("Asia/Kolkata")
                    .format("DD MMM YYYY, hh:mm A")}
                </strong>
              </AccordionDetails>
              <AccordionDetails>{todo.description}</AccordionDetails>
              <AccordionActions>
                <Button onClick={() => toggleTodoStatus(todo._id, todo.status)}>
                  {todo.status ? "Undo" : "Complete"}
                </Button>
                <Button onClick={() => deleteTodo(todo._id)}>Remove</Button>
              </AccordionActions>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
