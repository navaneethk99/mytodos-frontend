import React from "react";
import { Routes, Route } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../stylesheets/inapp.css";
import ProfilePage from "./ProfilePage";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

const InApp = () => {
  return (
    <>
      <div className="app-container">
        <div className="logo-container">
          <img
            src="/images/mytodos logo.png"
            style={{ height: "100%", width: "100%" }}
            alt="MyTodos Logo"
          />
        </div>

        <Routes>
          <Route path="add" element={<AddTodo />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="todos" element={<Todos />} />
        </Routes>
      </div>

      <BottomNav />
    </>
  );
};

export default InApp;
