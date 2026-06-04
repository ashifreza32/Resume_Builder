import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    // Reference to the user who owns this resume
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        default: 'untitled réumé'
    },
    public: {
        type: Boolean,
        default: false // Resumes are private by default
    },
    template: {
        type: String,
        default: 'classic'
    },
    ascentColor: {
        type: String,
        default: '#000000'
    },
    professionalSummary: {
        type: String,
        default: ''
    },
    skills: [String],
    personalInfo: {
        image: { type: String, default: '' },
        fullName: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedIn: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    experience: [
        {
            company: String,
            position: String,
            startDate: String,
            endDate: String,
            description: String,
            isCurrent: { type: Boolean, default: false }
        }
    ],
    projects: [
        {
            name: String,
            type: String,
            description: String
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            field: String,
            graduationDate: String,
            GPA: String
        }
    ]
}, { 
    timestamps: true, // Automatically manages createdAt and updatedAt fields
    minimize: false  // Ensures empty objects are saved in the database
});

const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

export default Resume;