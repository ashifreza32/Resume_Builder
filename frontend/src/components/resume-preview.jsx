import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';

const ResumePreview = ({ data, template, ascentColor, classes = '' }) => {
    // Switch case ka istemal karke sahi template render karna [3]
    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate data={data} ascentColor={ascentColor} />;
            case 'minimal':
                return <MinimalTemplate data={data} ascentColor={ascentColor} />;
            case 'image':
            case 'minimal image':
                return <MinimalImageTemplate data={data} ascentColor={ascentColor} />;
            default:
                // Default mein Classic template dikhega [4]
                return <ClassicTemplate data={data} ascentColor={ascentColor} />;
        }
    };

return (
        <div className={`w-full bg-gray-100 min-h-screen p-5 ${classes}`}>
            {/* Resume ka main container jise print kiya ja sakega [5] */}
            <div id="resume-preview" className="bg-white shadow-2xl mx-auto overflow-hidden">
                {renderTemplate()}
            </div>

            {/* Custom CSS for Preview [6] */}
            <style dangerouslySetInnerHTML={{ __html: `
                #resume-preview {
                    width: 210mm; /* A4 size width */
                    min-height: 297mm; /* A4 size height */
                }
                @media print {
                    body * { visibility: hidden; }
                    #resume-preview, #resume-preview * { visibility: visible; }
                    #resume-preview { position: absolute; left: 0; top: 0; width: 100%; border: none; box-shadow: none; }
                }
            `}} />
        </div>
    );
};

export default ResumePreview;





