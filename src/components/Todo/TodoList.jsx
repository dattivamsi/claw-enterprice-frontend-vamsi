
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Title from 'antd/es/skeleton/Title';
import NewTodo from './NewTodo';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api';
import { useNavigate } from 'react-router-dom';

const TodoList = ({ token, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();

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

  const handleCreate = async (description, status) => {
    try {
      const newTodo = await createTodo(description, status);
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error(err);
    }
    setIsModalVisible(false);
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
    setIsDeleteModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
    onLogout();
  };

  const handleAddButton = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false);
    setSelectedTodo(null);
  };

  const handleEditClick = (record) => {
    setSelectedTodo(record);
    setIsModalVisible(true);
  };

  const handleDeleteModal = (record) => {
    setSelectedTodo(record);
    setIsDeleteModalVisible(true);
  };

  const handleSubmit = async (data) => {
    if (selectedTodo) {
      await handleUpdate(selectedTodo.id, data.todo, data.completed);
    } else {
      await handleCreate(data.todo, data.completed);
    }
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  const columns = [
    {
      title: "S No",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 350,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data, status) =>
        data === "Completed" ? (
          <div className="status">
            <p className="complted">Completed</p>
          </div>
        ) : (
          <div className="In-status">
            <p className="complted">Inprogress</p>
          </div>
        ),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <>
          <EditOutlined
            style={{ marginRight: "2rem" }}
            onClick={() => handleEditClick(record)}
          />
          <DeleteOutlined onClick={() => handleDeleteModal(record)} />
        </>
      ),
    },
  ];

  return (
    <>
      {isDeleteModalVisible && (
        <Modal
          title={<Title level={4}>Confirm Delete</Title>}
          open={isDeleteModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary" onClick={() => handleDelete(selectedTodo.id)}>
              Confirm
            </Button>,
          ]}
          className="right-aligned-modal"
        >
          Are you sure you want to delete this todo?
        </Modal>
      )}
      {isModalVisible && (
        <Modal
          title={<Title level={4}>{selectedTodo ? "Edit Todo" : "New Todo"}</Title>}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className="right-aligned-modal"
        >
          <NewTodo
            onSubmit={handleSubmit}
            handleCancel={handleCancel}
            defaultValues={selectedTodo ? { todo: selectedTodo.description, completed: selectedTodo.status } : {}}
          />
        </Modal>
      )}
      <div style={{ width: "5rem", margin: "auto" }}>
        <Button onClick={handleAddButton}>Add Todo</Button>
      </div>
      <h2>To-Do List</h2>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Table columns={columns} dataSource={todos} />
      </div>
    </>
  );
};

export default TodoList;
