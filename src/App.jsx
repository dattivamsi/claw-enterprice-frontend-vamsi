import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/todos" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/todos" />} />
        {/* <Route
          path="/todos"
          element={token ? <TodoPage /> : <Navigate to="/login" />}
        /> */}
         <Route path="/todos" element={<PrivateRoute element={TodoPage} />} />
      </Routes>
    </Router>
  );
};

export default App;
