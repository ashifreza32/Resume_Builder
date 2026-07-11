import React, { useState } from 'react';
import { Layout, Check } from 'lucide-react';

const TemplateSelector = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Available Templates ka data
    const templates = [
        { id: 'classic', name: 'Classic', preview: 'Professional vertical layout' },
        { id: 'modern', name: 'Modern', preview: 'Two-column design with sidebar' },
        { id: 'minimal', name: 'Minimal', preview: 'Clean and simple typography' },
        { id: 'image', name: 'Minimal Image', preview: 'Simple layout with profile photo' }
    ];

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
            >
                <Layout size={16} className="text-gray-600" />
                <span>Template</span>
            </button>

            {isOpen && (
                <div className="absolute top-12 left-0 w-64 bg-white border rounded-xl shadow-xl z-50 p-2 space-y-1">
                    {templates.map((template) => (
                        <div 
                            key={template.id}
                            onClick={() => {
                                onChange(template.id);
                                setIsOpen(false);
                            }}
                            className={`p-3 rounded-lg cursor-pointer relative group transition-all ${
                                selected === template.id ? 'bg-blue-50 border-blue-200 border' : 'hover:bg-gray-50 border border-transparent'
                            }`}
                        >
                            <h4 className="text-sm font-bold text-gray-800">{template.name}</h4>
                            <p className="text-[10px] text-gray-500 leading-tight">{template.preview}</p>
                            
                            {selected === template.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;