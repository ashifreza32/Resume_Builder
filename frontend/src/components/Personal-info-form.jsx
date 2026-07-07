import React from 'react';
import { User, Mail, Phone, MapPin, BriefcaseBusiness, Linkedin, Globe } from 'lucide-react';

const PersonalInfoForm = ({ data, onChange, removeBg, setRemoveBg }) => {
    
    const handleFieldChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'email', label: 'Email Address', icon: Mail, type: 'email' },
        { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
        { key: 'location', label: 'Location', icon: MapPin, type: 'text' },
        { key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text' },
        { key: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, type: 'url' },
        { key: 'website', label: 'Personal Website', icon: Globe, type: 'url' }
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            
            {/* Image Upload Section */}
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                <label className="cursor-pointer flex flex-col items-center">
                    {data?.image ? (
                        <img 
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-green-500" 
                        />
                    ) : (
                        <div className="p-4 bg-white border rounded-full"><User size={24} /></div>
                    )}
                    <input 
                        type="file" hidden accept="image/*" 
                        onChange={(e) => handleFieldChange('image', e.target.files)} 
                    />
                </label>
                <div>
                    <p className="text-sm font-medium">Profile Photo</p>
                    <label className="flex items-center gap-2 mt-1 cursor-pointer">
                        <input 
                            type="checkbox" checked={removeBg} 
                            onChange={() => setRemoveBg(!removeBg)} 
                        />
                        <span className="text-xs text-gray-600">AI Background Remove</span>
                    </label>
                </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-xs font-semibold flex items-center gap-1 text-gray-600">
                            <field.icon size={14} /> {field.label}
                        </label>
                        <input
                            type={field.type}
                            className="p-2 border rounded outline-none focus:ring-1 focus:ring-green-500"
                            placeholder={`Enter ${field.label}`}
                            value={data?.[field.key] || ''}
                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalInfoForm;