import express from 'express';
import { 
    enhanceProfessionalSummary, 
    enhanceJobDescription, 
    uploadResume 
} from '../controllers/AIController.js';
import protect from '../middlewares/authMiddleware.js';

const AIRouter = express.Router();

// 1. Route to enhance professional summary using AI
// Path: /api/AI/enhance-pro-sum
AIRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);

// 2. Route to enhance job description using AI
// Path: /api/AI/enhance-job-description
AIRouter.post('/enhance-job-description', protect, enhanceJobDescription);

// 3. Route to extract data from an existing PDF resume using AI
// Path: /api/AI/upload-resume
AIRouter.post('/upload-resume', protect, uploadResume);

export default AIRouter;