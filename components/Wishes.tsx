import React from 'react';
import Section from './Section';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const Wishes: React.FC = () => {
    // ĐIỀN TÊN BẠN VÀO ĐÂY
    const senderName = "Hồ Quốc Thắng";

  return (
    <Section title="Lời chúc cuối cùng" icon={<StarIcon />}>
        <div className="text-center space-y-4">
             <p className="text-lg">
                Chúc bạn có một ngày sinh nhật thật ý nghĩa bên gia đình và bạn bè. Mong rằng chặng đường phía trước của bạn sẽ luôn rực rỡ và tràn ngập niềm vui!
            </p>
             <p className="font-bold text-2xl text-amber-600">
                未来可期!
            </p>
            <p className="text-slate-500">
                (wèilái kě qī - Tương lai đáng mong đợi)
            </p>
        </div>
        <div className="mt-8 pr-4">
            <p className="font-dancing text-2xl text-rose-500 text-right">Thân tặng,</p>
            <p className="font-dancing text-3xl text-rose-600 text-right">{senderName}</p>
        </div>
    </Section>
  );
};

export default Wishes;