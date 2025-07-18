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

  return (
    <div className="todos-container">
      <div className="todos-box">
        {todos.map((todo, index) => (
          // <div key={index} className="todos-todo">
          //   <div>
          //     <strong>{todo.title}</strong>
          //   </div>
          //   <div>{todo.description}</div>
          //   <div>Status: {todo.status ? "✅ Done" : "🕓 Pending"}</div>
          // </div>
          <Accordion
            sx={{
              mb: 2,
              minHeight: "10vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              color: todo.status ? "green" : "black"
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">
                <strong>{todo.title}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{todo.description}</AccordionDetails>
            <AccordionActions>
              <Button>{todo.status ? "remove" : "complete"}</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Todos;
