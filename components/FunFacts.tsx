
import React from 'react';
import Section from './Section';

const FunFactsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const facts = [
  "Năm 1891: James Naismith, một giáo viên người Canada, đã phát minh ra môn bóng rổ.",
  "Năm 1939: Bộ phim kinh điển 'Cuốn theo chiều gió' (Gone with the Wind) ra mắt tại Atlanta, Georgia.",
  "Năm 1966: Walt Disney, nhà tiên phong trong lĩnh vực phim hoạt hình, qua đời ở tuổi 65.",
  "Năm 1970: Tàu vũ trụ Venera 7 của Liên Xô trở thành tàu vũ trụ đầu tiên hạ cánh thành công trên một hành tinh khác (sao Kim).",
  "Đây cũng là ngày sinh của Hoàng đế La Mã Nero (năm 37) và Gustave Eiffel, kiến trúc sư của Tháp Eiffel (năm 1832)."
];

const FunFacts: React.FC = () => {
  return (
    <Section title="Ngày 15/12 có gì đặc biệt?" icon={<FunFactsIcon />}>
      <ul className="list-disc list-inside space-y-3">
        {facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
    </Section>
  );
};

export default FunFacts;
