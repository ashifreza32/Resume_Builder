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
                
                {/* AI Enhance Button */}
                <button 
                    disabled={isGenerating || !data}
                    onClick={generateSummary}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 transition-all"
                >
                    {isGenerating ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Sparkles size={16} />
                    )}
                    {isGenerating ? 'Enhancing...' : 'AI Enhance'}
                </button>
            </div>

            {/* Summary Textarea */}
            <div className="mt-6">
                <textarea
                    rows={7}
                    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm leading-relaxed"
                    placeholder="e.g. Passionate Software Engineer with 5+ years of experience in building scalable web applications..."
                    value={data || ''}
                    onChange={(e) => onchange(e.target.value)}
                />
                <p className="mt-2 text-xs text-gray-400 italic">
                    Tip: Highlight your key achievements and years of experience.
                </p>
            </div>
        </div>
    );
};

export default ProfessionalSummaryForm;