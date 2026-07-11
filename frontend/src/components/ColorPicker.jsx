import { useState } from 'react';
import { Palette, Check } from 'lucide-react';

const ColorPicker = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Default Color Palette
    const colors = [
        { name: 'Blue', value: '#2563eb' },
        { name: 'Green', value: '#16a34a' },
        { name: 'Pink', value: '#db2777' },
        { name: 'Orange', value: '#ea580c' },
        { name: 'Purple', value: '#9333ea' },
        { name: 'Black', value: '#000000' }
    ];
    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
            >
                <Palette size={16} className="text-gray-600" />
                <span>Ascent</span>
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white border rounded-xl shadow-xl z-50 p-3 grid grid-cols-3 gap-3">
                    {colors.map((color) => (
                        <div 
                            key={color.value}
                            onClick={() => {
                                onChange(color.value);
                                setIsOpen(false);
                            }}
                            className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                            <div 
                                className="w-8 h-8 rounded-full border-2 relative flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ backgroundColor: color.value, borderColor: selected === color.value ? '#333' : 'transparent' }}
                            >
                                {selected === color.value && <Check size={14} className="text-white" />}
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">{color.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;