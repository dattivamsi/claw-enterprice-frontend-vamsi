import React from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "../components/Todo/TodoList";
import image11 from '../assets/todoimage.png'

const TodoPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="header">
        <div className="todo-image-container">
        <img src={image11} alt="Todo" className="todo_img"/>
        </div>
        <h1 className="heading">To Do application</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TodoList />
    </div>
  );
};

export default TodoPage;
