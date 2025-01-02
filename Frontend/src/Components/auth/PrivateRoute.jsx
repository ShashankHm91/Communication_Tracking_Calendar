import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    return token && isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

