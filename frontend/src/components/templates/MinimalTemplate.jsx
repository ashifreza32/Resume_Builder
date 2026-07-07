import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const MinimalTemplate = ({ data, ascentColor }) => {
    return (
        <div className="p-10 bg-white min-h-[297mm] font-sans text-gray-800">
            {/* 1. Minimal Header */}
            <header className="border-b pb-6 mb-8">
                <h1 className="text-3xl font-light tracking-tighter" style={{ color: ascentColor }}>
                    {data?.personalInfo?.fullName || 'Your Name'}
                </h1>
                <p className="text-lg font-medium text-gray-500 uppercase tracking-widest mt-1">
                    {data?.personalInfo?.profession || 'Profession'}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-[13px] text-gray-600">
                    {data?.personalInfo?.email && (
                        <span className="flex items-center gap-1.5"><Mail size={12} /> {data.personalInfo.email}</span>
                    )}
                    {data?.personalInfo?.phone && (
                        <span className="flex items-center gap-1.5"><Phone size={12} /> {data.personalInfo.phone}</span>
                    )}
                    {data?.personalInfo?.location && (
                        <span className="flex items-center gap-1.5"><MapPin size={12} /> {data.personalInfo.location}</span>
                    )}
                </div>
            </header>

            {/* 2. Professional Summary */}
            {data?.professionalSummary && (
                <section className="mb-8">
                    <p className="text-sm italic leading-relaxed text-gray-600">
                        {data.professionalSummary}
                    </p>
                </section>
            )}

            {/* 3. Work Experience */}
            {data?.experience?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ borderColor: ascentColor }}>
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-xs font-medium mb-2" style={{ color: ascentColor }}>{exp.company}</p>
                                <p className="text-xs text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Education */}
            {data?.education?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ borderColor: ascentColor }}>
                        Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="text-xs">
                                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                <p className="text-gray-500">{edu.institute}</p>
                                <p className="text-[10px] text-gray-400 mt-1 italic">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. Projects */}
            {data?.projects?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ borderColor: ascentColor }}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-sm text-gray-900 leading-none">{project.name}</h3>
                                <p className="text-[11px] italic text-gray-500 mb-1">{project.type}</p>
                                <p className="text-xs text-gray-600 leading-relaxed">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Skills (Horizontal Tags) */}
            {data?.skills?.length > 0 && (
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-l-4 pl-3" style={{ borderColor: ascentColor }}>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 border text-[10px] font-semibold uppercase tracking-wider rounded-sm"
                                style={{ borderColor: `${ascentColor}40`, color: ascentColor, backgroundColor: `${ascentColor}08` }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;