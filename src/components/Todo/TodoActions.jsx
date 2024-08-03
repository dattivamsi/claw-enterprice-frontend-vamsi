import React from 'react';

const TodoActions = ({ todo, onUpdate, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdate(todo.id, todo.description, e.target.value);
  };

  return (
    <div>
      <select
        value={todo.status}
        onChange={handleStatusChange}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={() => onUpdate(todo.id, todo.description, todo.status)}>Update</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoActions;
