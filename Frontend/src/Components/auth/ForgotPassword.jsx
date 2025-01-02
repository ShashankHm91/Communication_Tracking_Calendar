import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from '../../utils/api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Eye Icons

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Password length validation
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
    
        try {
            await forgotPassword(email, newPassword);
            navigate("/login");
        } catch (error) {
            // Display exact error from API
            alert(error.response?.data?.message || 'Error resetting password. Please try again.');
        }
    };
    

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
