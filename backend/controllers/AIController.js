import AI from "../configs/AI.js";
import Resume from "../models/Resume.js";

// 1. Professional Summary ko AI se behtar banane ke liye
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body; // Frontend se aayi summary

        if (!userContent) {
            return res.status(400).json({ message: "missing required fields" });
        }

        // AI ko instruction dena
        const response = await AI.chat.completions.create({
            model: process.env.OPENAI_MODEL, // Gemini 1.5 Flash
            messages: [
                { 
                    role: "system", 
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary. Keep it 1-2 sentences, highlighting key skills and objectives. Make it ATS friendly. Return only the enhanced text." 
                },
                { role: "user", content: userContent }
            ],
        });

        const enhancedContent = response.choices.message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 2. Job Description ko AI se enhance karne ke liye
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "missing required fields" });
        }

        const response = await AI.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { 
                    role: "system", 
                    content: "You are an expert in resume writing. Enhance the job description to 1-2 sentences using action verbs and quantifiable results. Make it ATS friendly. Return only the enhanced text." 
                },
                { role: "user", content: userContent }
            ],
        });

        const enhancedContent = response.choices.message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// 3. Existing PDF se data extract karke naya resume banane ke liye
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId; // Middleware se mili user ID

        if (!resumeText) {
            return res.status(400).json({ message: "missing required fields" });
        }

        const systemPrompt = "You are an expert AI agent to extract data from resume.";
        const userPrompt = `Extract data from this resume: ${resumeText}. Provide data in the following JSON format: { professionalSummary, skills, personalInfo, experience, projects, education }. Return only JSON.`;

        const response = await AI.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" } // JSON format mein response maangna
        });

        const extractedData = response.choices.message.content;
        const parsedData = JSON.parse(extractedData);

        // Database mein save karna
        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        res.status(200).json({ resumeId: newResume._id });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};