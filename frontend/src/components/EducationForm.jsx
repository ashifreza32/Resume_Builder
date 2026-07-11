import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationForm = ({ data, onchange }) => {

    // 1. Nayi Education entry add karna [1]
    const addEducation = () => {
        const newEducation = {
            institute: '',
            degree: '',
            field: '',
            graduationDate: '',
            GPA: ''
        };
        onchange([...data, newEducation]);
    };

    // 2. Education entry remove karna [2]
    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onchange(updated);
    };

    // 3. Kisi specific field ko update karna [2]
    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onchange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                    <p className="text-sm text-gray-500">Add your academic qualifications [3].</p>
                </div>
                <button 
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 font-medium transition-all"
                >
                    <Plus size={16} /> Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-xl text-gray-400">
                    <GraduationCap size={40} className="mb-2 opacity-20" />
                    <p>No education added yet [3].</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {data.map((edu, index) => (
                        <div key={index} className="p-5 border rounded-xl bg-gray-50 space-y-4 relative">
                            <button 
                                onClick={() => removeEducation(index)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>

                            <h4 className="text-sm font-bold text-gray-700 uppercase">Education #{index + 1} [4]</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Institute Name [5] */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Institute</label>
                                    <input
                                        type="text"
                                        placeholder="University/School Name"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={edu.institute}
                                        onChange={(e) => updateEducation(index, 'institute', e.target.value)}
                                    />
                                </div>

                                {/* Degree [5] */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Degree</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bachelor of Science"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                    />
                                </div>

                                {/* Field of Study [6] */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Field of Study</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Computer Science"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                    />
                                </div>

                                {/* Graduation Date [7] */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">Graduation Date</label>
                                    <input
                                        type="month"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={edu.graduationDate}
                                        onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                                    />
                                </div>

                                {/* GPA (Optional) [7] */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600">GPA (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 3.8/4.0"
                                        className="p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500"
                                        value={edu.GPA}
                                        onChange={(e) => updateEducation(index, 'GPA', e.target.value)}
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

export default EducationForm;