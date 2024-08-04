import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
