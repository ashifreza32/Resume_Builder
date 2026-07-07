import React from 'react';
import { Mail, Phone, MapPin, Linkedin, G lobe } from 'lucide-react';

const ModernTemplate = ({ data, ascentColor }) => {
    return (
        <div className="flex min-h-[297mm] bg-white">
            {/* Left Column: Sidebar */}
            <div className="w-1/3 p-8 text-white" style={{ backgroundColor: ascentColor }}>
                {/* Profile Image */}
                {data?.personalInfo?.image && (
                    <div className="mb-6 flex justify-center">
                        <img 
                            src={typeof data.personalInfo.image === 'string' ? data.personalInfo.image : URL.createObjectURL(data.personalInfo.image)} 
                            className="w-32 h-32 rounded-full object-cover border-4 border-white/30"
                            alt="Profile"
                        />
                    </div>
                )}

                <h1 className="text-2xl font-bold uppercase leading-tight mb-1">
                    {data?.personalInfo?.fullName || 'Your Name'}
                </h1>
                <p className="text-sm font-medium opacity-90 mb-8 uppercase tracking-wider">
                    {data?.personalInfo?.profession || 'Profession'}
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-sm font-bold uppercase border-b border-white/30 pb-1">Contact</h2>
                    <div className="space-y-2 text-xs">
                        {data?.personalInfo?.email && <p className="flex items-center gap-2"><Mail size={12}/> {data.personalInfo.email}</p>}
                        {data?.personalInfo?.phone && <p className="flex items-center gap-2"><Phone size={12}/> {data.personalInfo.phone}</p>}
                        {data?.personalInfo?.location && <p className="flex items-center gap-2"><MapPin size={12}/> {data.personalInfo.location}</p>}
                    </div>
                </div>

                {/* Skills */}
                {data?.skills?.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase border-b border-white/30 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-white/20 rounded text-[10px] font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Main Content */}
            <div className="w-2/3 p-8">
                {/* Professional Summary */}
                {data?.professionalSummary && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: ascentColor }}>
                            Profile
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data?.experience?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: ascentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between font-bold text-sm text-gray-800">
                                        <span>{exp.position}</span>
                                        <span className="text-gray-500 font-normal italic text-xs">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-600 mb-1">{exp.company}</p>
                                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data?.education?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: ascentColor }}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between text-xs">
                                    <div className="w-3/4">
                                        <span className="font-bold block text-gray-800">{edu.degree} in {edu.field}</span>
                                        <p className="text-gray-600">{edu.institute}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="italic text-gray-500">{edu.graduationDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data?.projects?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: ascentColor }}>
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {data.projects.map((project, index) => (
                                <div key={index}>
                                    <h4 className="font-bold text-sm text-gray-800">{project.name}</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed italic mb-1">{project.type}</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;