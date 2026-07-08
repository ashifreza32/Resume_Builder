import { Sparkles, Loader2 } from 'lucide-react';
const ProfessionalSummaryForm = ({ data, onchange, generateSummary, isGenerating }) => {  
    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add a summary for your resume or use AI to generate one.
                    </p>
                </div>
     