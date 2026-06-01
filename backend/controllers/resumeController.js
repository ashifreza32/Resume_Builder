import Resume from "../models/resume.js";
import fs from "fs";
import imageKit from "../configs/imagekit.js";

// 1. Naya Resume banane ke liye
export const createResume = async (req, res) => {
    try {
        const userId = req.userId; // Middleware se mili ID [1]
        const { title } = req.body;

        const newResume = await Resume.create({
            userId,
            title
        });

        res.status(201).json({
            message: "resume created successfully",
            resume: newResume
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2. Resume delete karne ke liye
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId }); // Owner check ke saath delete [2]

        res.status(200).json({ message: "resume deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. User ka specific Resume fetch karne ke liye (Private)
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "resume not found" });
        }

        // Response bhejte waqt extra metadata hatana [3]
         

        res.status(200).json({ resume });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. Public Resume dekhne ke liye (Shared link ke liye)
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        // Sirf wahi resume milega jo 'public: true' ho [4]
        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if (!resume) {
            return res.status(404).json({ message: "resume not found" });
        }

        res.status(200).json({ resume });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 5. Resume Update karne ke liye (Data aur Image dono handle karta hai)
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file; // Malter middleware se aayi file [5]

        let resumeDataCopy;
        // String data ko JSON mein badalna [6]
        if (typeof resumeData === 'string') {
            resumeDataCopy = JSON.parse(resumeData);
        } else {
            resumeDataCopy = structuredClone(resumeData);
        }

        // Agar image upload hui hai toh ImageKit par bhejna [7]
        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            
            const response = await imageKit.upload({
                file: imageBufferData,
                fileName: "resume.png",
                folder: "user_resumes",
                transformation: {
                    pre: `w-300,h-300,fo-face,z-0.75${removeBackground === 'true' ? ',e-bg_remove' : ''}` // AI background removal aur face focus [8, 9]
                }
            });
            
            resumeDataCopy.personalInfo.image = response.url; // New image URL set karna [9]
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true } // Updated data wapas milega [10]
        );

        res.status(200).json({
            message: "saved successfully",
            resume: updatedResume
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};