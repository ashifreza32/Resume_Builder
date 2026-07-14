import express from 'express';
import { 
    createResume, 
    updateResume, 
    deleteResume, 
    getResumeById, 
    getPublicResumeById 
} from '../controllers/resumeController.js';
import protect from '../middlewares/authMiddleware.js'; // Token verification ke liye
import upload from '../configs/multer.js'; // Image upload handle karne ke liye


const resumeRouter = express.Router();


// 1. Naya Resume banane ke liye (POST)
// Path: /api/resumes/create
resumeRouter.post('/create', protect, createResume);

// 2. Resume update karne aur image upload karne ke liye (PUT)
// Ismein 'upload' middleware image file ko handle karta hai
resumeRouter.put('/update', upload.single('image'), protect, updateResume);

// 3. Resume delete karne ke liye (DELETE)
// Path: /api/resumes/delete/:resumeId
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);

// 4. User ka apna specific resume fetch karne ke liye (GET - Private)
resumeRouter.get('/get/:resumeId', protect, getResumeById);

// 5. Publicly shared resume dekhne ke liye (GET - Public)
// Ismein 'protect' middleware nahi laga hai taaki koi bhi link se dekh sake
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;