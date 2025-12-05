# 🤖 Google Gemini 2.5 Flash API 整合指南

## 概述

本專案已整合 Google Gemini 2.5 Flash API，使用智能 AI 客服系統提供自然語言對話。

## ✨ 功能特點

✅ 使用最新 Gemini 2.5 Flash 模型
✅ 繁體中文客服支援
✅ 自動降級備用方案（API 失敗時使用本地回應）
✅ 生產環境 & 開發環境就緒
✅ Vercel Serverless 兼容

## 🚀 快速開始

### 1. 獲取 Gemini API 密鑰

#### 步驟 A：訪問 Google AI Studio

1. 打開 [Google AI Studio](https://aistudio.google.com/)
2. 使用 Google 帳戶登錄
3. 點擊 **"Get API Key"** 或左側菜單的 **"API keys"**
4. 點擊 **"Create new secret key"**
5. 複製生成的 API 密鑰

#### 步驟 B：保存 API 密鑰

將 API 密鑰保存在安全的地方（不要提交到 Git）

### 2. 本地配置

編輯 `.env` 檔案：

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Google Gemini API
GEMINI_API_KEY=你的_API_密鑰
GEMINI_MODEL=gemini-2.5-flash
```

### 3. 安裝依賴

```bash
npm install
```

新增的依賴：
- `@google/generative-ai` - Google Gemini AI SDK

### 4. 本地測試

```bash
npm run dev
```

訪問 `http://localhost:3000` 並測試 AI 聊天功能。

## 📋 API 規格

### 聊天端點

```
POST /api/chat
Content-Type: application/json

{
  "message": "你好，請問你們有什麼服務？"
}
```

**成功響應 (200):**

```json
{
  "success": true,
  "userMessage": "你好，請問你們有什麼服務？",
  "aiResponse": "你好！👋 我們提供多種服務...",
  "timestamp": "2024-12-05T10:30:00.000Z"
}
```

**錯誤響應 (400):**

```json
{
  "error": "消息不能為空"
}
```

## 🔧 Gemini 模型配置

### 當前使用的模型

- **模型名稱**: `gemini-2.5-flash`
- **特點**: 
  - 超快響應速度
  - 適合實時對話
  - 低成本
  - 高質量回應

### 可用的替代模型

- `gemini-2.0-pro` - 更強大的推理能力
- `gemini-1.5-pro` - 長上下文支援

### 切換模型

編輯 `.env`：

```env
GEMINI_MODEL=gemini-2.0-pro  # 改為其他模型
```

## 🎯 客服提示詞設計

系統提示詞已在 `backend/utils/aiResponse.js` 和 `/api/chat.js` 中定義：

```javascript
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
```

### 自定義提示詞

編輯 `backend/utils/aiResponse.js` 或 `/api/chat.js` 中的 `systemPrompt` 變數。

## 🌐 Vercel 部署配置

### 步驟 1：在 Vercel 設置環境變數

1. 進入 Vercel 項目設置
2. 進入 **Environment Variables**
3. 添加以下變數：

```
GEMINI_API_KEY = 你的_API_密鑰
GEMINI_MODEL = gemini-2.5-flash
```

⚠️ **重要**：不要在代碼中提交 API 密鑰！

### 步驟 2：部署

```bash
git add .
git commit -m "Add Gemini API integration"
git push
```

Vercel 將自動部署。部署完成後，API 將使用環境變數中的 Gemini 密鑰。

## 🔐 安全最佳實踐

### ✅ 應該做的事

- ✅ 在 `.env` 中本地保存密鑰（Git 會忽略）
- ✅ 在 Vercel 項目設置中配置密鑰
- ✅ 定期輪換 API 密鑰
- ✅ 監控 API 使用量

### ❌ 不應該做的事

- ❌ 不要在代碼中硬編碼 API 密鑰
- ❌ 不要將 `.env` 提交到 Git
- ❌ 不要公開分享 API 密鑰
- ❌ 不要在前端代碼中暴露 API 密鑰

## 📊 監控和調試

### 查看 API 使用情況

1. 訪問 [Google AI Studio](https://aistudio.google.com/)
2. 查看 **"Token count"** 部分
3. 檢查使用量限制

### 常見錯誤

| 錯誤 | 原因 | 解決方案 |
|------|------|---------|
| `GEMINI_API_KEY is undefined` | 未設置 API 密鑰 | 在 `.env` 或 Vercel 中配置密鑰 |
| `400 Bad Request` | 模型名稱錯誤 | 確認 GEMINI_MODEL 值正確 |
| `401 Unauthorized` | API 密鑰無效 | 重新生成並驗證密鑰 |
| `429 Too Many Requests` | API 配額已用完 | 等待或升級 API 配額 |

### 查看日誌

**本地開發：**
```bash
npm run dev
# 查看終端輸出
```

**Vercel 部署：**
1. 進入 Vercel 項目
2. 點擊 **Deployments**
3. 選擇部署版本
4. 查看 **Runtime logs**

## 💡 進階功能

### 多輪對話

目前系統每次發送單條消息。可以擴展為多輪對話：

```javascript
// 保存對話歷史
const conversationHistory = [];

async function generateAIResponse(userMessage) {
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const response = await model.generateContent({
    contents: conversationHistory,
    generationConfig: { temperature: 0.7 }
  });

  const aiMessage = response.response.text();
  conversationHistory.push({
    role: 'model',
    parts: [{ text: aiMessage }]
  });

  return aiMessage;
}
```

### 流式回應

實現實時回應流：

```javascript
const response = await model.generateContentStream({
  contents: [{ role: 'user', parts: [{ text: userMessage }] }]
});

for await (const chunk of response.stream) {
  // 逐步返回回應
}
```

## 📞 支援資源

- [Google Generative AI 官方文檔](https://ai.google.dev/docs)
- [Gemini API 參考](https://ai.google.dev/api)
- [Node.js SDK 示例](https://github.com/google/generative-ai-js)

## 🔄 更新和維護

### 檢查 SDK 更新

```bash
npm outdated
npm update @google/generative-ai
```

### 備份和恢復

如 API 出現問題，系統會自動使用本地回應機制。

## 📈 成本評估

Gemini 2.5 Flash 是免費層模型，具有以下限制：

- 免費層配額充足用於開發
- 生產環境建議設置配額限制
- 詳見 [Google AI 定價](https://ai.google.dev/pricing)

---

**準備好開始了嗎？** 🚀 按照上述步驟配置，享受智能 AI 客服系統！
