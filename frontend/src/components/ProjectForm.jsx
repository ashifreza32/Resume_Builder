import React from 'react';
import { Plus, Trash2, Folder } from 'lucide-react';

const ProjectForm = ({ data, onchange }) => {

    // 1. Naya Project add karne ka function
    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: ''
        };
        onchange([...data, newProject]);
    };

    // 2. Project remove karne ka function
    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onchange(updated);
    };

    // 3. Project ki fields update karne ka function
    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onchange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-tight">Projects</h3>
                    <p className="text-sm text-gray-500">Highlight your best work here.</p>
                </div>
                <button 
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 font-medium transition-all"
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-xl text-gray-400">
                    <Folder size={40} className="mb-2 opacity-20" />
                    <p>No projects added yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {data.map((project, index) => (
                        <div key={index} className="p-5 border rounded-xl bg-gray-50 space-y-4 relative">
                            <button 
                                onClick={() => removeProject(index)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>

                            <h4 className="text-xs font-bold text-gray-500 uppercase">Project #{index + 1}</h4>

                            <div className="grid grid-cols-1 gap-4">
                                {/* Project Name */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. AI Resume Builder"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={project.name}
                                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                                    />
                                </div>

                                {/* Project Type */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Project Type</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Full Stack Web Application"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={project.type}
                                        onChange={(e) => updateProject(index, 'type', e.target.value)}
                                    />
                                </div>

                                {/* Project Description */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe your project, key features and tools used..."
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500 text-sm"
                                        value={project.description}
                                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectForm;