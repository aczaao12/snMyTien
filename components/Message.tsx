import React from 'react';
import Section from './Section';

const MessageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const Message: React.FC = () => {
  return (
    <Section title="Gửi Mỹ Tiên," icon={<MessageIcon />}>
      <p className="text-lg leading-relaxed">
        Chúc mừng sinh nhật nhé! Vậy là đã bước sang tuổi 20 rồi, một cột mốc thật đẹp. Tuổi mới chúc bạn luôn xinh đẹp, vui vẻ, tràn đầy năng lượng và đạt được mọi mục tiêu mình đặt ra.
      </p>
      <p className="leading-relaxed">
        Đặc biệt, trên con đường chinh phục tiếng Trung, mong bạn sẽ luôn giữ vững nhiệt huyết và ngày càng tiến bộ. Cố lên nhé!
      </p>
      <p className="text-center font-bold text-xl text-rose-500 pt-2">
        加油! <span className="text-base text-slate-500 font-normal">(jiāyóu!)</span>
      </p>
    </Section>
  );
};

export default Message;