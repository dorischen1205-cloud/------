# 🚀 現代化企業官網 + AI 客服系統

一個使用 Node.js + Express + Vanilla JavaScript 構建的完整企業官網解決方案，包含即時 AI 聊天客服。

## ✨ 主要功能

- 🌐 現代化企業官網
- 💬 即時 AI 聊天客服
- 📋 聯絡表單
- 🎨 玻璃擬態設計風格
- 🌡️ 溫暖色調
- 📱 完全響應式設計
- 🔄 前後端分離架構
- ☁️ Vercel Serverless 部署

## 📂 專案結構

```
.
├── api/                      # Vercel Serverless 函數
│   ├── health.js            # 健康檢查 API
│   ├── chat.js              # AI 聊天 API
│   └── contact.js           # 聯絡表單 API
├── backend/                 # 後端代碼（本地開發用）
│   ├── server.js            # 伺服器入口
│   ├── app.js               # Express 應用配置
│   ├── routes/              # API 路由
│   │   ├── health.js
│   │   ├── chat.js
│   │   └── contact.js
│   ├── middleware/          # 中介層
│   │   ├── errorHandler.js  # 全局錯誤處理
│   │   └── corsMiddleware.js # CORS 配置
│   └── utils/               # 工具函數
│       └── aiResponse.js    # AI 回應生成
├── public/                  # 前端靜態文件
│   ├── index.html          # 主頁面
│   ├── styles.css          # 樣式表
│   └── script.js           # 互動邏輯
├── package.json            # 依賴配置
├── vercel.json            # Vercel 部署配置
├── .env                   # 環境變數
├── .env.example           # 環境變數範例
├── .gitignore             # Git 忽略規則
└── README.md              # 本文件
```

## 🛠️ 技術棧

### 後端
- **Node.js** - JavaScript 運行時
- **Express.js** - Web 框架
- **CORS** - 跨域資源共享
- **dotenv** - 環境變數管理

### 前端
- **HTML5** - 頁面結構
- **CSS3** - 玻璃擬態設計、動畫效果
- **Vanilla JavaScript** - 交互邏輯（無框架依賴）

### 部署
- **Vercel** - Serverless 函數託管
- **Git** - 版本控制

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 本地開發

```bash
npm run dev
```

服務器將在 `http://localhost:3000` 啟動

### 構建

```bash
npm run build
```

### 部署到 Vercel

1. 推送代碼到 GitHub
2. 在 [Vercel](https://vercel.com) 導入項目
3. 設置環境變數
4. 自動部署

## 📡 API 文檔

### 健康檢查

```
GET /api/health
```

**響應:**
```json
{
  "status": "ok",
  "message": "伺服器運行正常",
  "timestamp": "2024-12-05T10:30:00.000Z",
  "uptime": 3600.5
}
```

### AI 聊天

```
POST /api/chat
Content-Type: application/json

{
  "message": "你好"
}
```

**響應:**
```json
{
  "success": true,
  "userMessage": "你好",
  "aiResponse": "你好！歡迎來到我們的服務。有什麼我可以幫你的嗎？",
  "timestamp": "2024-12-05T10:30:00.000Z"
}
```

### 聯絡表單

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "諮詢",
  "message": "我想了解更多信息"
}
```

**響應:**
```json
{
  "success": true,
  "message": "感謝您的聯絡，我們會盡快回覆。",
  "timestamp": "2024-12-05T10:30:00.000Z"
}
```

## 🎨 設計特點

### 玻璃擬態 (Glassmorphism)
- 半透明背景
- 毛玻璃效果 (backdrop-filter)
- 柔和邊框
- 層次感陰影

### 色彩方案
- **主色** (#ff9f43) - 溫暖橙色
- **次色** (#ffa502) - 深橙色
- **強調色** (#ff6b6b) - 溫暖紅色
- **背景** (#fffaf0) - 溫暖米色

### 動畫效果
- 平滑滾動
- 懸停效果
- 浮動動畫
- 消息滑入效果

## 🔧 環境變數

複製 `.env.example` 為 `.env` 並配置：

```bash
PORT=3000                              # 伺服器埠號
NODE_ENV=development                   # 環境（development/production）
CORS_ORIGIN=http://localhost:3000     # CORS 允許的源
AI_API_KEY=your_api_key_here          # AI API 密鑰（可選）
AI_MODEL=gpt-3.5-turbo                # AI 模型（可選）
```

## 💡 功能說明

### 首頁 (Hero)
- 醒目的歡迎信息
- 號召性行動按鈕
- 浮動動畫效果

### 關於我們
- 公司使命介紹
- 核心價值展示
- 玻璃卡片設計

### 服務展示
- 四個主要服務類別
- 圖標和描述
- 網格佈局

### AI 聊天客服
- 實時對話介面
- 自動滾動到最新消息
- 智能回應系統
- 支持中英文

### 聯絡表單
- 表單驗證
- 錯誤提示
- 成功反饋
- 響應式設計

## 🔒 安全特性

- CORS 保護
- 輸入驗證
- 錯誤處理
- 環境變數配置
- 無明文密鑰存儲

## 📊 代碼質量

- JSDoc 註釋
- 關鍵邏輯註解
- 模組化架構
- 一致的命名規範
- ES6+ 語法

## 🐛 常見問題

### Q: 如何集成真實的 AI API？
A: 修改 `backend/utils/aiResponse.js`，調用實際的 AI API（如 OpenAI）

### Q: 如何發送郵件通知？
A: 在 `backend/routes/contact.js` 中集成郵件服務（如 nodemailer）

### Q: 支持多語言嗎？
A: 目前以繁體中文為主，可輕松擴展支持其他語言

### Q: 如何自定義設計？
A: 編輯 `public/styles.css` 中的 CSS 變數和样式

## 📝 開發規範

### 命名規範
- 變數/函數：camelCase
- 類別：PascalCase
- 常數：UPPER_SNAKE_CASE

### 代碼風格
- ES6+ 語法
- 異步使用 async/await
- 錯誤使用 try-catch

### 註釋
- 主要函數需要 JSDoc
- 複雜邏輯需要註解
- 保持代碼可讀性

## 🚀 部署步驟

### Vercel 部署

1. **準備代碼**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **連接 Vercel**
   - 訪問 [Vercel](https://vercel.com)
   - 使用 GitHub 登錄
   - 導入此項目

3. **配置環境變數**
   - 在 Vercel 項目設置中添加 `.env` 變數

4. **自動部署**
   - 推送代碼到 main 分支會自動觸發部署

## 📞 支援

如有問題，請通過以下方式聯絡：
- 📧 Email: contact@company.com
- 📱 Phone: +886 2 1234 5678
- 💬 在線聊天: 使用網站上的 AI 客服

## 📄 許可證

MIT License

## 🙏 致謝

感謝所有貢獻者和使用者的支持！

---

**最後更新**: 2024年12月5日
