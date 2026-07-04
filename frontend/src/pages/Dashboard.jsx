import  { useState, useEffect } from 'react';
import { Plus, UploadCloud, FileText, Pencil, Trash2, LoaderCircle, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../config/API';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdf-to-text';

const Dashboard = () => {
    // State Management
    const [allResumes, setAllResumes] = useState([]);
    const [showCreateResume, setShowCreateResume] = useState(false);
    const [showUploadResume, setShowUploadResume] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [editResumeId, setEditResumeId] = useState('');

    const { user, token } = useSelector((state) => state.o);
    const navigate = useNavigate();

    // Resumes ki list background colors ke liye
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6'
    ];

    // 1. Saare Resumes Load karna
    const loadAllResumes = async () => {
        try {
            const { data } = await API.get('/api/users/resumes', {
                headers: { authorization: token }
            });
            setAllResumes(data.resumes);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (token) loadAllResumes();
    }, [token]);

    // 2. Naya Resume Create karna
    const createResume = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/api/resumes/create', { title }, {
                headers: { authorization: token }
            });
            setAllResumes([...allResumes, data.resume]);
            setShowCreateResume(false);
            setTitle('');
            navigate(`/app/builder/${data.resume._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // 3. Purana Resume (PDF) Upload karke AI se data nikalna
    const uploadResume = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const text = await pdfToText(resumeFile);
            const { data } = await API.post('/api/AI/upload-resume', { title, resumeText: text }, {
                headers: { authorization: token }
            });
            setShowUploadResume(false);
            navigate(`/app/builder/${data.resumeId}`);
        } catch (error) {
            toast.error("Error uploading resume");
        } finally {
            setIsLoading(false);
        }
    };

    // 4. Resume Delete karna
    const deleteResume = async (id) => {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            try {
                const { data } = await API.delete(`/api/resumes/delete/${id}`, {
                    headers: { authorization: token }
                });
                setAllResumes(allResumes.filter(r => r._id !== id));
                toast.success(data.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <p className="text-2xl font-bold text-gray-800">Hi, {user?.name}</p>
                <div className="flex gap-4 mt-6">
                    <button onClick={() => setShowCreateResume(true)} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                        <Plus size={20} /> Create Resume
                    </button>
                    <button onClick={() => setShowUploadResume(true)} className="flex items-center gap-2 border-2 border-purple-500 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50">
                        <UploadCloud size={20} /> Upload Existing
                    </button>
                </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Resume Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allResumes.map((resume, index) => (
                    <div 
                        key={resume._id} 
                        className="relative group p-6 rounded-xl cursor-pointer transition-all hover:scale-105"
                        style={{ backgroundColor: `${colors[index % colors.length]}20`, border: `2px solid ${colors[index % colors.length]}` }}
                        onClick={() => navigate(`/app/builder/${resume._id}`)}
                    >
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); deleteResume(resume._id); }} className="p-1 text-red-600 hover:bg-white rounded"><Trash2 size={18} /></button>
                        </div>
                        <FileText size={40} style={{ color: colors[index % colors.length] }} />
                        <h3 className="mt-4 font-bold text-gray-800">{resume.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">Updated on: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {/* Modal: Create Resume */}
            {showCreateResume && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <form onSubmit={createResume} className="bg-white p-8 rounded-xl max-w-md w-full relative">
                        <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowCreateResume(false)} />
                        <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                        <input 
                            type="text" required placeholder="Enter Resume Title" 
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 mb-4"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button className="w-full bg-green-600 text-white py-3 rounded-lg">Create</button>
                    </form>
                </div>
            )}

            {/* Modal: Upload Resume */}
            {showUploadResume && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <form onSubmit={uploadResume} className="bg-white p-8 rounded-xl max-w-md w-full relative">
                        <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowUploadResume(false)} />
                        <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
                        <input 
                            type="text" required placeholder="Resume Title" 
                            className="w-full p-3 border rounded-lg mb-4"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input 
                            type="file" accept=".pdf" required 
                            className="w-full mb-4"
                            onChange={(e) => setResumeFile(e.target.files)}
                        />
                        <button disabled={isLoading} className="w-full bg-purple-600 text-white py-3 rounded-lg flex justify-center items-center gap-2">
                            {isLoading ? <><LoaderCircle className="animate-spin" /> Processing...</> : "Upload & AI Enhance"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;