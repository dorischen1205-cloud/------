/**
 * Vercel Serverless API - AI 聊天
 * 使用 Google Gemini 2.5 Flash
 * /api/chat.js
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * 生成 AI 客服回應
 * @param {string} userMessage - 用戶消息
 * @returns {Promise<string>} AI 回應
 */
async function generateAIResponse(userMessage) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return getLocalResponse(userMessage);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });

    const systemPrompt = `你是一個專業、友善的企業客服助手。
    
你的職責是：
1. 用繁體中文回答客戶的問題
2. 提供關於公司服務和產品的信息
3. 引導客戶通過聯絡表單提交詢問
4. 保持專業和禮貌的語氣
5. 如果不知道答案，誠實地說出並建議通過聯絡表單聯繫我們

公司信息：
- 我們提供高品質的產品和服務
- 支持多種服務包括產品銷售、技術支援和客戶服務
- 營業時間：周一至周五 9:00-18:00
- 聯絡郵箱：contact@company.com`;

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\n客戶提問：${userMessage}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const result = response.response.text();
    return result || '感謝你的提問。請稍候或通過聯絡表單與我們聯繫。';
  } catch (error) {
    console.error('❌ Gemini API 錯誤:', error.message);
    return getLocalResponse(userMessage);
  }
}

/**
 * 本地回應系統（API 失敗時的備用方案）
 * @param {string} userMessage - 用戶消息
 * @returns {string} 本地回應
 */
function getLocalResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    greeting: '你好！👋 歡迎來到我們的服務。有什麼我可以幫你的嗎？',
    product: '📦 我們提供多種高品質的產品和服務。您對哪個特別感興趣？',
    price: '💰 價格根據具體需求而定。建議你透過聯絡表單提供更多詳情，我們會給你報價。',
    contact: '📧 您可以透過頁面上的聯絡表單與我們聯繫，我們會盡快回覆。',
    help: '🤝 我可以協助你了解我們的服務、回答常見問題，或幫你與我們的團隊聯繫。',
  };

  if (
    lowerMessage.includes('你好') ||
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi')
  ) {
    return responses.greeting;
  }

  if (
    lowerMessage.includes('產品') ||
    lowerMessage.includes('服務') ||
    lowerMessage.includes('product') ||
    lowerMessage.includes('service')
  ) {
    return responses.product;
  }

  if (
    lowerMessage.includes('價格') ||
    lowerMessage.includes('費用') ||
    lowerMessage.includes('price') ||
    lowerMessage.includes('cost')
  ) {
    return responses.price;
  }

  if (
    lowerMessage.includes('聯絡') ||
    lowerMessage.includes('聯繫') ||
    lowerMessage.includes('contact') ||
    lowerMessage.includes('email')
  ) {
    return responses.contact;
  }

  if (
    lowerMessage.includes('幫助') ||
    lowerMessage.includes('幫忙') ||
    lowerMessage.includes('help')
  ) {
    return responses.help;
  }

  return '感謝你的提問。如果你需要更多幫助，請透過聯絡表單與我們聯繫。';
}

module.exports = async (req, res) => {
  // 設置 CORS 頭
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 方法' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: '無效的消息格式',
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        error: '消息不能為空',
      });
    }

    const response = await generateAIResponse(message);

    res.status(200).json({
      success: true,
      userMessage: message,
      aiResponse: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('錯誤:', error);
    res.status(500).json({
      error: error.message || '伺服器內部錯誤',
      timestamp: new Date().toISOString(),
    });
  }
};
