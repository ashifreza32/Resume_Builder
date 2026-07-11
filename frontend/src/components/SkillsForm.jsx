import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

const SkillsForm = ({ data, onchange }) => {
    const [newSkill, setNewSkill] = useState('');

    // 1. Naya skill add karne ka function [3]
    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            onchange([...data, newSkill.trim()]);
            setNewSkill('');
        }
    };

    // 2. Skill remove karne ka function [3, 4]
    const removeSkill = (indexToRemove) => {
        const updated = data.filter((_, index) => index !== indexToRemove);
        onchange(updated);
    };

    // 3. Enter key se skill add karna [4]
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                <p className="text-sm text-gray-500">Add your technical and soft skills.</p>
            </div>

            {/* Input Section [5, 6] */}
            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg outline-none focus:ring-1 focus:ring-green-500 text-sm"
                    placeholder="e.g. React.js, Python, Leadership"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button 
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                >
                    <Plus size={16} /> Add
                </button>
            </div>

            {/* Skills List (Tags) [2, 7] */}
            <div className="flex flex-wrap gap-2">
                {data.length === 0 ? (
                    <div className="w-full text-center py-6 border-2 border-dashed rounded-xl text-gray-400">
                        <Sparkles size={24} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm">No skills added yet.</p>
                    </div>
                ) : (
                    data.map((skill, index) => (
                        <div 
                            key={index} 
                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 border rounded-full text-sm font-medium text-gray-700 group hover:border-green-500 transition-all"
                        >
                            {skill}
                            <button 
                                onClick={() => removeSkill(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Tip Section [8] */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed">
                    <span className="font-bold uppercase mr-1">Tip:</span> 
                    Professional skills ko highlight karne se aapke resume ke shortlist hone ke chances badh jaate hain.
                </p>
            </div>
        </div>
    );
};

export default SkillsForm;