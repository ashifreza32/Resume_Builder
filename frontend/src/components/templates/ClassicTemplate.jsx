import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ClassicTemplate = ({ data, ascentColor }) => {
    return (
        <div className="p-8 bg-white min-h-[297mm]">
            {/* 1. Header (Personal Info) */}
            <header className="text-center border-b-2 pb-5" style={{ borderColor: ascentColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ color: ascentColor }}>
                    {data?.personalInfo?.fullName || 'Your Name'}
                </h1>
                <p className="text-xl font-medium mt-1 text-gray-700 uppercase tracking-wider">
                    {data?.personalInfo?.profession || 'Profession'}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
                    {data?.personalInfo?.email && (
                        <span className="flex items-center gap-1"><Mail size={14} /> {data.personalInfo.email}</span>
                    )}
                    {data?.personalInfo?.phone && (
                        <span className="flex items-center gap-1"><Phone size={14} /> {data.personalInfo.phone}</span>
                    )}
                    {data?.personalInfo?.location && (
                        <span className="flex items-center gap-1"><MapPin size={14} /> {data.personalInfo.location}</span>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
                    {data?.personalInfo?.linkedin && (
                        <span className="flex items-center gap-1"><Linkedin size={14} /> {data.personalInfo.linkedin}</span>
                    )}
                    {data?.personalInfo?.website && (
                        <span className="flex items-center gap-1"><Globe size={14} /> {data.personalInfo.website}</span>
                    )}
                </div>
            </header>

            {/* 2. Professional Summary */}
            {data?.professionalSummary && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold border-b mb-2 uppercase tracking-wide" style={{ color: ascentColor, borderColor: ascentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed text-justify">
                        {data.professionalSummary}
                    </p>
                </section>
            )}

            {/* 3. Experience */}
            {data?.experience?.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold border-b mb-3 uppercase tracking-wide" style={{ color: ascentColor, borderColor: ascentColor }}>
                        Professional Experience
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between font-bold text-sm">
                                    <span>{exp.position} at {exp.company}</span>
                                    <span className="text-gray-500 font-normal italic">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Projects */}
            {data?.projects?.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold border-b mb-3 uppercase tracking-wide" style={{ color: ascentColor, borderColor: ascentColor }}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between font-bold text-sm">
                                    <span>{project.name} | <span className="font-normal italic text-xs">{project.type}</span></span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. Education */}
            {data?.education?.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold border-b mb-3 uppercase tracking-wide" style={{ color: ascentColor, borderColor: ascentColor }}>
                        Education
                    </h2>
                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <div>
                                    <span className="font-bold">{edu.degree}</span> in <span className="font-medium">{edu.field}</span>
                                    <p className="text-gray-600">{edu.institute}</p>
                                </div>
                                <div className="text-right">
                                    <p className="italic text-gray-500">{edu.graduationDate}</p>
                                    {edu.GPA && <p className="text-xs font-semibold">GPA: {edu.GPA}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Skills */}
            {data?.skills?.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold border-b mb-3 uppercase tracking-wide" style={{ color: ascentColor, borderColor: ascentColor }}>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ascentColor }}></div>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;