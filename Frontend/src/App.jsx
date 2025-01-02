import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./Components/Dashboards/Admin/AdminDashboard";
import './App.css';
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import ForgotPassword from "./Components/auth/ForgotPassword";
import UserDashboard from "./Components/Dashboards/User/UserDashboard";
import PrivateRoute from "./Components/auth/PrivateRoute";  
import NotFound from "./Components/auth/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/adminDashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
