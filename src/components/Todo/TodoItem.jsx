import React, { useState } from 'react';
import TodoActions from './TodoActions';
import { Table } from 'antd';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onUpdate(todo.id, description, todo.status);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
        <div>
          <span>{todo.description}</span>
          <TodoActions todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
