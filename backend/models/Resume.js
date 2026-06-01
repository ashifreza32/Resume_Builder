import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    // User ki ID jisse resume juda hai [1]
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        default: 'untitled réumé' // Default title [2]
    },
    public: {
        type: Boolean,
        default: false // By default resume private rahega [2]
    },
    template: {
        type: String,
        default: 'classic' // Default template [2]
    },
    ascentColor: {
        type: String,
        default: '#000000' // Template ka theme color [2, 3]
    },
    professionalSummary: {
        type: String,
        default: ''
    },
    skills: [String], // Skills ki array [3]
    personalInfo: {
        image: { type: String, default: '' },
        fullName: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedIn: { type: String, default: '' },
        website: { type: String, default: '' }
    }, [3, 4]
    experience: [
        {
            company: String,
            position: String,
            startDate: String,
            endDate: String,
            description: String,
            isCurrent: { type: Boolean, default: false }
        }
    ], [4, 5]
    projects: [
        {
            name: String,
            type: String,
            description: String
        }
    ], [5]
    education: [
        {
            institution: String,
            degree: String,
            field: String,
            graduationDate: String,
            GPA: String
        }
    ] [5, 6]
}, { 
    timestamps: true, // Create aur update ka time save karne ke liye [6]
    minimize: false // Khali objects ko bhi database mein save rakhne ke liye [6]
});

const Resume = mongoose.model('Resume', resumeSchema); [6]

export default Resume;