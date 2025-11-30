import React, { useEffect, useRef } from 'react';

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
    const selectorRef = useRef(null);

    const languages = [
        { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'zh', label: '中文', flag: '🇨🇳' }
    ];

    return (
        <div ref={selectorRef} className="fixed top-6 right-6 z-50 flex gap-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`
            px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300
            flex items-center gap-2 font-medium
            ${currentLang === lang.code
                            ? 'bg-white/40 border-white/60 shadow-lg scale-105'
                            : 'bg-white/20 border-white/30 hover:bg-white/30 hover:scale-105'
                        }
          `}
                    title={lang.label}
                >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm hidden sm:inline">{lang.code.toUpperCase()}</span>
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
