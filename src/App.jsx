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
        <Route path="/" element={<LoginPage />} />
        <Route path="/login"  index element={<LoginPage /> } />
        <Route path="/register" element={<RegisterPage /> } />
        
        <Route 
          path="/todos" 
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
