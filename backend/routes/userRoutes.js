import express from 'express';
import { registerUser, loginUser, getUserById, getUserResumes } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js'; // Humne pichle step mein ise oMiddleware.js bhi kaha tha

const userRouter = express.Router();

// 1. User Registration Route (POST)
// Path: /api/users/register
userRouter.post('/register', registerUser);

// 2. User Login Route (POST)
// Path: /api/users/login
userRouter.post('/login', loginUser);

// 3. User Data Fetch karne ke liye (GET)

userRouter.get('/data', protect, getUserById);

// 4. User ke banaye gaye saare resumes mangwane ke liye (GET)
userRouter.get('/resumes', protect, getUserResume);

export default userRouter;