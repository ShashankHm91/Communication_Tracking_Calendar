const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateAuthToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign(
        { userId: user._id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password, userType } = req.body;

    // Validate required fields
    if (!email || !password || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email and userType
        const user = await User.findOne({ email, userType });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or user type" });
        }

        // Directly compare passwords
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate authentication token
        const token = generateAuthToken(user);

        // Respond with token and user details
        res.status(200).json({
            token,
            expiresIn: "1h",
            user: {
                name: user.name,
                email: user.email,
                userType: user.userType,
            },
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Sign-Up Controller
exports.signUp = async (req, res) => {
    const { name, email, password, userType } = req.body;

    // Validate required fields
    if (!name || !email || !password || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Save user without hashing password
        const user = new User({ name, email, password, userType });
        await user.save();

        // Generate token
        const token = generateAuthToken(user);

        res.status(201).json({
            token,
            expiresIn: "1h",
            user: { name: user.name, email: user.email, userType: user.userType },
        });
    } catch (error) {
        console.error("Error in sign up:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Validate required field
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Implement password reset logic (e.g., generate and send a reset token)
        // Placeholder response for now
        res.status(200).json({ message: "Password reset link sent to email" });
    } catch (error) {
        console.error("Error in forgot password:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
