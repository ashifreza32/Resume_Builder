import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

// Helper function to generate JWT Token [1]
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token 7 din mein expire hoga [1]
    });
};

// 1. Controller for User Registration [2]
// Path: /API/users/register (POST) [2]
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Body se data lena [3]

        // Check if required fields are present [3]
        if (!name || !email || !password) {
            return res.status(400).json({ message: "missing required fields" });
        }

        // Check if user already exists [4]
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exist" });
        }

        // Create new user with hashed password [5]
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token and return success message [6]
        const token = generateToken(newUser._id);
        newUser.password = undefined; // Password ko response mein nahi bhejna [6]

        res.status(201).json({
            message: "user created successfully",
            token,
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};

// 2. Controller for User Login 
// Path: /API/users/login (POST) 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists [8]
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        // Verify password using the method we created in User Model [8]
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        // Generate token and return response [9]
        const token = generateToken(user._id);
        user.password = undefined;

        res.status(200).json({
            message: "login successful",
            token,
            user
        });

    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};

// 3. Controller for getting user data by ID [10]
// Path: /API/users/data (GET) [10]
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId; // Protect middleware se ID lena [10]

        const user = await User.findById(userId); // ID se user dhundhna [10]
        if (!user) {
            return res.status(404).json({ message: "user not found" }); [11]
        }

        user.password = undefined;
        res.status(200).json({ user }); 

    } catch (error) {
        res.status(400).json({ message: error.message }); [11]
    }
};

// Controller for getting user resumes [1]
// GET /api/users/resumes [1]
export const getUserResumes = async (req, res) => {
    try {
        // Protect middleware se mili userId ka istemal [2]
        const userId = req.userId; 

        // Database (Resume model) mein is userId se jude saare resumes dhundhna [2]
        const resumes = await Resume.find({ userId });

        // Success response ke saath resumes ki list bhejna [3]
        return res.status(200).json({
            resumes
        });
    } catch (error) {
        // Error aane par message bhejna [1, 2]
        return res.status(400).json({
            message: error.message
        });
    }
};