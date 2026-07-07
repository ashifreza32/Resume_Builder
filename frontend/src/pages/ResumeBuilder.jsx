import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Share2, Eye, EyeOff, Download, User, FileText, Briefcase, GraduationCap, Folder, Sparkles } from 'lucide-react';
import API from '../configs/api';
import toast from 'react-hot-toast';

// Form Components
import PersonalInfoForm from '../components/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';

const ResumeBuilder = () => {
    const { id } = useParams(); // URL se resume ID lena [2]
    const { token } = useSelector((state) => state.o);
    
    // 1. Full Initial State [1]
    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personalInfo: {},
        professionalSummary: '',
        experience: [],
        education: [],
        projects: [],
        skills: [],
        template: 'classic',
        asentColor: '#2563eb',
        public: false
    });

    const [activeSectionIndex, setActiveSectionIndex] = useState(0); // [3]
    const [removeBackground, setRemoveBackground] = useState(false);

    // Sections for Navigation [4, 5]
    const sections = [
        { id: 'personal', name: 'Personal Info', icon: User },
        { id: 'summary', name: 'Summary', icon: FileText },
        { id: 'experience', name: 'Experience', icon: Briefcase },
        { id: 'education', name: 'Education', icon: GraduationCap },
        { id: 'projects', name: 'Projects', icon: Folder },
        { id: 'skills', name: 'Skills', icon: Sparkles }
    ];

    // 2. Load Existing Data from DB [6, 7]
    const loadResume = async () => {
        try {
            const { data } = await API.get(`/api/resumes/get/${id}`, {
                headers: { authorization: token }
            });
            if (data.resume) {
                setResumeData(data.resume);
                document.title = data.resume.title;
            }
        } catch (error) {
            toast.error("Error loading resume");
        }
    };

    useEffect(() => {
        if (token) loadResume();
    }, [id, token]);

    // 3. Save Changes to DB [8-11]
    const handleSave = async () => {
        let updatedData = JSON.parse(JSON.stringify(resumeData));
        
        const formData = new FormData();
        formData.append('resumeId', id);
        
        // Agar photo file hai (URL nahi), toh use alag se append karein [10]
        if (typeof resumeData.personalInfo?.image === 'object') {
            formData.append('image', resumeData.personalInfo.image);
            delete updatedData.personalInfo.image;
        }

        formData.append('resumeData', JSON.stringify(updatedData));
        formData.append('removeBackground', removeBackground ? 'yes' : 'no');

        try {
            await toast.promise(
                API.put('/api/resumes/update', formData, {
                    headers: { authorization: token }
                }),
                {
                    loading: 'Saving...',
                    success: 'Saved successfully!',
                    error: 'Error saving'
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    // 4. Download PDF [12]
    const downloadResume = () => window.print();

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Top Bar [13-15] */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <Link to="/app" className="flex items-center gap-2 text-gray-600 hover:text-black">
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
                <div className="flex gap-3">
                    <button onClick={downloadResume} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg">
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Forms [4, 16, 17] */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    
                    {/* Progress Bar [18, 19] */}
                    <div className="mb-6">
                        <div className="h-1 w-full bg-gray-100 rounded-full">
                            <div 
                                className="h-1 bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <TemplateSelector 
                            selected={resumeData.template} 
                            onChange={(t) => setResumeData({...resumeData, template: t})} 
                        />
                        <ColorPicker 
                            selected={resumeData.asentColor} 
                            onChange={(c) => setResumeData({...resumeData, ascentColor: c})} 
                        />
                    </div>

                    {/* Dynamic Forms [17, 20-24] */}
                    <div className="min-h-[400px]">
                        {activeSectionIndex === 0 && <PersonalInfoForm data={resumeData.personalInfo} onChange={(d) => setResumeData({...resumeData, personalInfo: d})} removeBg={removeBackground} setRemoveBg={setRemoveBackground} />}
                        {activeSectionIndex === 1 && <ProfessionalSummaryForm data={resumeData.professionalSummary} onChange={(d) => setResumeData({...resumeData, professionalSummary: d})} />}
                        {activeSectionIndex === 2 && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData({...resumeData, experience: d})} />}
                        {activeSectionIndex === 3 && <EducationForm data={resumeData.education} onChange={(d) => setResumeData({...resumeData, education: d})} />}
                        {activeSectionIndex === 4 && <ProjectForm data={resumeData.projects} onChange={(d) => setResumeData({...resumeData, projects: d})} />}
                        {activeSectionIndex === 5 && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData({...resumeData, skills: d})} />}
                    </div>

                    {/* Navigation Buttons [25-28] */}
                    <div className="mt-8 pt-6 border-t flex justify-between">
                        <button 
                            disabled={activeSectionIndex === 0} 
                            onClick={() => setActiveSectionIndex(prev => prev - 1)}
                            className="px-6 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {activeSectionIndex < sections.length - 1 ? (
                            <button onClick={() => setActiveSectionIndex(prev => prev + 1)} className="px-6 py-2 bg-green-600 text-white rounded-lg">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Panel: Live Preview [29-32] */}
                <div className="lg:col-span-7 sticky top-6">
                    <ResumePreview 
                        data={resumeData} 
                        template={resumeData.template} 
                        ascentColor={resumeData.asentColor} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;