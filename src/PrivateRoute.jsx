import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Element {...rest} /> : <Link to="/login" />;
};

export default PrivateRoute;
