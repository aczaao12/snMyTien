import React, { useEffect, useState } from 'react';

const BrowserCheck = () => {
    const [isInAppBrowser, setIsInAppBrowser] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Detection logic for common in-app browsers
        // Zalo: Contains 'Zalo'
        // Messenger/Facebook: Contains 'FBAN' or 'FBAV'
        // Instagram: Contains 'Instagram'
        // Line: Contains 'Line'
        const inAppRules = [
            /Zalo/i,
            /FBAN/i,
            /FBAV/i,
            /Instagram/i,
            /Line/i,
        ];

        const isMatch = inAppRules.some((rule) => rule.test(userAgent));

        if (isMatch) {
            setIsInAppBrowser(true);
        }
    }, []);

    if (!isInAppBrowser) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 text-center">
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl animate-bounce-small">
                <div className="text-6xl mb-6">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-sans">
                    Vui lòng mở bằng trình duyệt ngoài
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Trình duyệt của ứng dụng này (Zalo, Messenger...) không hỗ trợ đầy đủ các hiệu ứng.
                    <br /><br />
                    Hãy nhấn vào dấu <strong>...</strong> ở góc màn hình và chọn <strong>"Mở bằng trình duyệt"</strong> (Chrome/Safari) để có trải nghiệm tốt nhất nhé!
                </p>
                <div className="flex justify-center gap-4 text-4xl opacity-80">
                    <span>🌐</span>
                    <span>➡️</span>
                    <span>chrome/safari</span>
                </div>
            </div>
        </div>
    );
};

export default BrowserCheck;
