/**
 * AI 回應生成工具 - 使用 Google Gemini 2.5 Flash
 * 集成真實 AI API 以生成智能回應
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// 初始化 Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * 生成 AI 客服回應
 * @param {string} userMessage - 用戶消息
 * @returns {Promise<string>} AI 回應
 */
async function generateAIResponse(userMessage) {
  try {
    // 檢查 API 密鑰
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  Gemini API 密鑰未配置，使用本地回應');
      return getLocalResponse(userMessage);
    }

    // 獲取 Gemini 模型
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });

    // 系統提示詞 - 定義 AI 客服的角色
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

    // 調用 Gemini API
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

    // 提取回應文本
    const result = response.response.text();
    return result || '感謝你的提問。請稍候或通過聯絡表單與我們聯繫。';
  } catch (error) {
    console.error('❌ Gemini API 錯誤:', error.message);
    // API 錯誤時使用本地回應
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

  // 簡單的關鍵字匹配
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

  // 默認回應
  return '感謝你的提問。如果你需要更多幫助，請透過聯絡表單與我們聯繫。';
}

module.exports = {
  generateAIResponse,
  getLocalResponse,
};
