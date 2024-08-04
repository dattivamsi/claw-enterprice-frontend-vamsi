import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to your backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registeration = async (username,email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username,email, password });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`, { headers: getAuthHeaders() });
  return response.data;
};

export const createTodo = async (description,status) => {
  console.log(status);
  
  const response = await axios.post(`${API_URL}/todos`, { description,status }, { headers: getAuthHeaders() });
  return response.data;
};

export const updateTodo = async (id, description, status) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, { description, status }, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/todos/${id}`, { headers: getAuthHeaders() });
};
