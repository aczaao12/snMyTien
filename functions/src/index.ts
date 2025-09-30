import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { GoogleGenAI, Type } from "@google/genai";

// The API key is stored in Firebase config to keep it secure
const API_KEY = functions.config().gemini.key;
if (!API_KEY) {
  // This will prevent the function from deploying if the key isn't set
  throw new Error("Gemini API Key not set. Use 'firebase functions:config:set gemini.key=\"YOUR_KEY\"'");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateNames = functions.region('us-central1').https.onRequest(async (request, response) => {
    // Enable CORS for local development
    response.set('Access-Control-Allow-Origin', '*');
    if (request.method === 'OPTIONS') {
        // Pre-flight request
        response.set('Access-Control-Allow-Methods', 'POST');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
        return;
    }

    if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    const name = request.body.name;

    if (typeof name !== 'string' || name.trim().length === 0) {
        response.status(400).json({ error: "The function must be called with a 'name' argument in the body." });
        return;
    }

    logger.info(`Generating names for: ${name}`, { structuredData: true });
    
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

    try {
        const genAIResponse = await ai.models.generateContent({
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

        const jsonText = genAIResponse.text.trim();
        const parsedNames = JSON.parse(jsonText);
        response.status(200).json(parsedNames);
    } catch (error) {
        logger.error("Error calling Gemini API:", error);
        response.status(500).json({ error: "Failed to generate names from Gemini API." });
    }
});
