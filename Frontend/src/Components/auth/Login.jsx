import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from '../../utils/api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "", userType: "user", showPassword: false });

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordToggle = () => {
        setCredentials((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Password length validation
    if (credentials.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try {
        const response = await login(credentials);
        if (response && response.token && response.user && response.user.userType) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('isAuthenticated', true);
            window.location.href = response.user.userType === 'admin' ? '/adminDashboard' : '/dashboard';
        } else {
            throw new Error('Invalid response structure from server.');
        }
    } catch (error) {
        // Display exact error from API
        alert(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    }
};


    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <div className="relative mb-4">
                        <input
                            type={credentials.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                            {credentials.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Login as:</label>
                        <select
                            name="userType"
                            value={credentials.userType}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link>
                    <p className="mt-2">Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:underline">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
