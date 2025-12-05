/**
 * AI 回應生成工具
 * 模擬 AI 客服回應（可集成真實 AI API）
 */

/**
 * 生成 AI 客服回應
 * @param {string} userMessage - 用戶消息
 * @returns {Promise<string>} AI 回應
 */
async function generateAIResponse(userMessage) {
  // 這是一個簡單的本地 AI 回應模擬
  // 可以替換為真實的 API 調用（如 OpenAI, Claude 等）

  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    greeting: '你好！歡迎來到我們的服務。有什麼我可以幫你的嗎？',
    product: '我們提供多種高品質的產品和服務。您對哪個特別感興趣？',
    price: '價格根據具體需求而定。建議你透過聯絡表單提供更多詳情，我們會給你報價。',
    contact: '您可以透過頁面上的聯絡表單與我們聯繫，我們會盡快回覆。',
    help: '我可以協助你了解我們的服務、回答常見問題，或幫你與我們的團隊聯繫。',
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
};
