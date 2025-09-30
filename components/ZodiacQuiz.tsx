import React, { useState, useEffect } from 'react';
import Section from './Section';

const ZodiacIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-3-8h6V8h-6v6z" clipRule="evenodd" />
    </svg>
);

const zodiacData = [
  { name: "Tý (Chuột)", characteristics: "Thông minh, nhanh trí, linh hoạt và có khả năng thích ứng cao. Người tuổi Tý thường rất duyên dáng và có tài xã giao.", startYear: 1924 },
  { name: "Sửu (Trâu)", characteristics: "Chăm chỉ, kiên định, đáng tin cậy và có ý chí mạnh mẽ. Người tuổi Sửu sống thực tế, có trách nhiệm và không ngại khó khăn.", startYear: 1925 },
  { name: "Dần (Hổ)", characteristics: "Dũng cảm, mạnh mẽ, tự tin và đầy đam mê. Người tuổi Dần có tố chất lãnh đạo, thích phiêu lưu và luôn tràn đầy năng lượng.", startYear: 1926 },
  { name: "Mão (Mèo/Thỏ)", characteristics: "Nhã nhặn, dịu dàng, tinh tế và tốt bụng. Người tuổi Mão yêu hòa bình, có mắt thẩm mỹ và rất được lòng mọi người.", startYear: 1927 },
  { name: "Thìn (Rồng)", characteristics: "Oai phong, tham vọng, lôi cuốn và đầy sức sống. Người tuổi Thìn thường có lý tưởng lớn, thông minh và có sức ảnh hưởng.", startYear: 1928 },
  { name: "Tỵ (Rắn)", characteristics: "Bí ẩn, khôn ngoan, sâu sắc và có sức hấp dẫn. Người tuổi Tỵ có trực giác nhạy bén, tư duy logic và khả năng phân tích tốt.", startYear: 1929 },
  { name: "Ngọ (Ngựa)", characteristics: "Nhiệt tình, năng động, độc lập và yêu tự do. Người tuổi Ngọ thích giao du, luôn vui vẻ và có tinh thần lạc quan.", startYear: 1930 },
  { name: "Mùi (Dê)", characteristics: "Hiền lành, nhân hậu, sáng tạo và có tâm hồn nghệ sĩ. Người tuổi Mùi sống tình cảm, lãng mạn và có lòng trắc ẩn.", startYear: 1931 },
  { name: "Thân (Khỉ)", characteristics: "Tinh nghịch, thông minh, hài hước và ham học hỏi. Người tuổi Thân rất nhanh nhạy, có khả năng giải quyết vấn đề tốt.", startYear: 1932 },
  { name: "Dậu (Gà)", characteristics: "Tự tin, thẳng thắn, có tổ chức và rất chăm chỉ. Người tuổi Dậu có tinh thần trách nhiệm cao và luôn theo đuổi sự hoàn hảo.", startYear: 1933 },
  { name: "Tuất (Chó)", characteristics: "Trung thành, thật thà, tốt bụng và đáng tin cậy. Người tuổi Tuất luôn sẵn sàng giúp đỡ người khác và có tinh thần chính nghĩa.", startYear: 1934 },
  { name: "Hợi (Heo)", characteristics: "Hào phóng, vị tha, ôn hòa và luôn vui vẻ. Người tuổi Hợi sống chân thành, yêu thích sự thoải mái và sung túc.", startYear: 1935 },
];

const getZodiac = (year: number) => {
    return zodiacData.find(z => (year - z.startYear) % 12 === 0);
};

const ZodiacQuiz: React.FC = () => {
    const friendBirthYear = 2005;
    const [selectedYear, setSelectedYear] = useState<number | null>(friendBirthYear);
    const [result, setResult] = useState<{name: string; characteristics: string} | null>(null);

    const currentYear = new Date().getFullYear();
    // A sensible range of years for a dropdown, ensuring it includes the friend's year.
    const years = Array.from({ length: 80 }, (_, i) => currentYear - 15 - i);

    const handleCalculate = (yearToCalc: number | null) => {
        if (yearToCalc) {
            const zodiac = getZodiac(yearToCalc);
            if (zodiac) {
                setResult({name: zodiac.name, characteristics: zodiac.characteristics});
            }
        }
    }
    
    // Automatically calculate for the friend's birth year on mount
    useEffect(() => {
        handleCalculate(friendBirthYear);
    }, []);

  return (
    <Section title="Khám phá con giáp của bạn" icon={<ZodiacIcon />}>
        <p>
            Bạn có biết con giáp nói lên điều gì về tính cách của mình không? Hãy chọn năm sinh và khám phá nhé!
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <select
                value={selectedYear || ''}
                onChange={(e) => {
                    setSelectedYear(parseInt(e.target.value));
                    setResult(null); // Clear previous result when changing year to encourage clicking button
                }}
                className="flex-grow w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white"
            >
                <option value="" disabled>-- Chọn năm sinh --</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
             <button
                onClick={() => handleCalculate(selectedYear)}
                disabled={!selectedYear}
                className="px-6 py-2 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-600 transition-colors disabled:bg-rose-300 disabled:cursor-not-allowed"
             >
                Xem kết quả
            </button>
        </div>
        
        {result && selectedYear === friendBirthYear && (
            <p className="text-center text-sm text-slate-500 mt-3 italic">
                Psst... mình tra giúp bạn năm 2005 nè 😉
            </p>
        )}

        {result && (
            <div className="mt-2 p-4 bg-rose-50/50 rounded-lg border border-rose-200 text-center animate-fade-in">
                <p className="text-xl">Năm {selectedYear} là năm của</p>
                <p className="font-playfair text-3xl text-amber-700 my-2">{result.name}</p>
                <p className="text-slate-600 text-justify">{result.characteristics}</p>
                 <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                    }
                 `}</style>
            </div>
        )}
    </Section>
  );
};

export default ZodiacQuiz;