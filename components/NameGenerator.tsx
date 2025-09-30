import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import Section from './Section';
import Loader from './Loader';
import { ChineseName } from '../types';

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const SkeletonLoader: React.FC = () => (
    <div className="bg-rose-50/50 p-4 rounded-lg border border-rose-200 animate-pulse">
        <div className="h-8 bg-rose-200 rounded-md w-1/3 mx-auto"></div>
        <div className="h-4 bg-rose-200 rounded-md w-1/4 mx-auto mt-2 mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-rose-200 rounded-md w-full"></div>
            <div className="h-4 bg-rose-200 rounded-md w-full"></div>
            <div className="h-4 bg-rose-200 rounded-md w-2/3"></div>
        </div>
    </div>
);


const NameGenerator: React.FC = () => {
  const [name, setName] = useState('Mỹ Tiên');
  const [generatedNames, setGeneratedNames] = useState<ChineseName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError('Bạn chưa nhập tên kìa!');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedNames([]);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let prompt;
      if (name.trim() === 'Mỹ Tiên') {
          prompt = `Bạn là một chuyên gia về văn hóa và cách đặt tên của Trung Quốc. Có một bạn nữ học sinh cấp 3 người Việt Nam đang học tiếng Trung. 
Tên tiếng Việt của bạn ấy là "Mỹ Tiên". Trong đó, "Mỹ" (美) có nghĩa là xinh đẹp, và "Tiên" (仙) có nghĩa là tiên nữ, nàng tiên. 
Dựa vào ý nghĩa này, hãy gợi ý 3 cái tên tiếng Trung thật hay và ý nghĩa cho bạn ấy. Với mỗi tên, hãy cung cấp:
1. Tên bằng chữ Hán.
2. Phiên âm Pinyin.
3. Giải thích chi tiết ý nghĩa của từng ký tự và ý nghĩa của cả cái tên, tại sao nó lại là một cái tên hay cho một bạn nữ.
Hãy trả lời bằng định dạng JSON.`;
      } else {
          prompt = `Bạn là một chuyên gia về văn hóa và cách đặt tên của Trung Quốc. Có một bạn nữ học sinh cấp 3 người Việt Nam đang học tiếng Trung. Tên tiếng Việt của bạn ấy là "${name}".
Hãy gợi ý 3 cái tên tiếng Trung thật hay và ý nghĩa cho bạn ấy. Với mỗi tên, hãy cung cấp:
1. Tên bằng chữ Hán.
2. Phiên âm Pinyin.
3. Giải thích chi tiết ý nghĩa của từng ký tự và ý nghĩa của cả cái tên, tại sao nó lại là một cái tên hay cho một bạn nữ.
Hãy trả lời bằng định dạng JSON.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                chineseName: { type: Type.STRING },
                pinyin: { type: Type.STRING },
                meaning: { type: Type.STRING }
              },
              required: ["chineseName", "pinyin", "meaning"]
            }
          }
        }
      });
      
      const jsonText = response.text.trim();
      const parsedNames = JSON.parse(jsonText);
      setGeneratedNames(parsedNames);

    } catch (err) {
      console.error(err);
      setError('Oops! Có lỗi xảy ra khi tạo tên. Bạn thử lại sau nhé.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section title="Một món quà nhỏ" icon={<GiftIcon />}>
      <p>Mình có một món quà nhỏ này, hy vọng sẽ giúp bạn có thêm động lực học tiếng Trung. Hãy nhập tên của bạn vào đây để nhận một vài gợi ý tên tiếng Trung ý nghĩa nhé!</p>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn..."
          className="flex-grow w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-6 py-2 bg-rose-500 text-white font-bold rounded-lg hover:bg-rose-600 transition-colors disabled:bg-rose-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Loader /> : 'Tạo tên cho tớ!'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {isLoading && (
        <div className="mt-6 space-y-4">
            <h3 className="font-playfair text-xl text-center">Đang nghĩ tên hay cho bạn...</h3>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
        </div>
      )}

      {generatedNames.length > 0 && !isLoading && (
        <div className="mt-6 space-y-4">
          <h3 className="font-playfair text-xl text-center">Đây là gợi ý của mình:</h3>
          {generatedNames.map((n, index) => (
            <div key={index} className="bg-rose-50/50 p-4 rounded-lg border border-rose-200">
              <p className="text-3xl text-center text-amber-700 tracking-widest">{n.chineseName}</p>
              <p className="text-center text-slate-500 mb-2">{n.pinyin}</p>
              <p className="text-justify whitespace-pre-wrap">{n.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default NameGenerator;