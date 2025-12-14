import React from 'react';

const StartOverlay = ({ onStart }) => {
    return (
        <div className="fixed inset-0 w-screen h-screen z-[100] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex items-center justify-center">
            <div className="text-center px-8">
                <h1 className="text-6xl md:text-8xl font-bold text-white handwriting mb-8 animate-pulse">
                    🎉 Sinh Nhật 20 🎂
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 mb-12 handwriting">
                    Gửi chúc mừng sinh nhật Bạn Đặng Thị Mỹ Tiên!
                </p>
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={onStart}
                        className="bg-white text-pink-600 px-12 py-6 rounded-full text-2xl md:text-3xl font-bold handwriting shadow-2xl hover:scale-110 transition-transform duration-300 hover:bg-pink-50"
                    >
                        Bắt đầu 🎵
                    </button>
                    <p className="text-white/80 text-lg handwriting animate-pulse">
                        Design By Hồ Quốc Thắng
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StartOverlay;
