import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api';
import { useNavigate } from 'react-router-dom';

const TodoList = ({ token, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        console.error(err);
      }
    };
    loadTodos();
  }, []);

  const handleCreate = async (description) => {
    try {
      const newTodo = await createTodo(description);
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, description, status) => {
    try {
      const updatedTodo = await updateTodo(id, description, status);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
    onLogout();
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <TodoInput onAdd={handleCreate} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
