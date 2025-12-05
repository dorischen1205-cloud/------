# 🚀 開發環境設置指南

## 前置要求

在運行此專案之前，請確保已安裝以下軟體：

### 1. Node.js 和 npm

#### macOS 用戶

**方式一：使用 Homebrew（推薦）**

```bash
# 安裝 Homebrew（如未安裝）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安裝 Node.js
brew install node

# 驗證安裝
node --version
npm --version
```

**方式二：從官網下載**

1. 訪問 [https://nodejs.org/](https://nodejs.org/)
2. 下載 LTS 版本（推薦）
3. 雙擊安裝程式
4. 按照提示完成安裝

### 2. Git

```bash
# macOS（Homebrew）
brew install git

# 驗證安裝
git --version
```

## 🏃 快速開始

### 第一步：克隆或進入專案目錄

```bash
cd /Users/shu/Desktop/未命名檔案夾
```

### 第二步：安裝依賴

```bash
npm install
```

這會安裝以下依賴：
- **express** - Web 框架
- **cors** - 跨域支援
- **dotenv** - 環境變數管理

### 第三步：啟動開發伺服器

```bash
npm run dev
```

你應該看到類似的輸出：
```
✅ 伺服器運行於 http://localhost:3000
```

### 第四步：打開瀏覽器

訪問 `http://localhost:3000` 即可查看網站

## 📋 可用命令

```bash
# 啟動開發伺服器
npm run dev

# 啟動生產伺服器
npm start

# 構建專案
npm run build

# 運行測試
npm test
```

## 🔧 環境變數配置

專案已包含 `.env` 檔案，包含基本配置：

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

如需修改，請編輯 `.env` 檔案。

## 🌐 訪問網站

### 本地開發
- **主頁**: http://localhost:3000
- **健康檢查**: http://localhost:3000/api/health
- **AI 聊天 API**: POST http://localhost:3000/api/chat
- **聯絡表單 API**: POST http://localhost:3000/api/contact

## 📁 專案檔案說明

### 前端文件（`/public`）
- `index.html` - 主頁面結構
- `styles.css` - 玻璃擬態設計樣式
- `script.js` - 交互邏輯

### 後端文件（`/backend`）
- `server.js` - 伺服器入口
- `app.js` - Express 應用配置
- `routes/` - API 路由處理器
- `middleware/` - 中介層（CORS、錯誤處理）
- `utils/` - 工具函數（AI 回應生成）

### Serverless 函數（`/api`）
- `health.js` - 健康檢查端點
- `chat.js` - AI 聊天端點
- `contact.js` - 聯絡表單端點

## 🐛 常見問題

### Q: 仍然看到 "npm: command not found"
**A**: Node.js 未正確安裝。請執行：
```bash
# 檢查安裝
node --version
npm --version

# 如果找不到，重新安裝 Node.js
brew install node  # macOS
```

### Q: Port 3000 已被占用
**A**: 修改 `.env` 中的 PORT：
```env
PORT=3001
```

### Q: 無法連接到 API
**A**: 確保：
1. 伺服器正在運行（`npm run dev`）
2. 正在使用正確的 URL
3. CORS 已正確配置

### Q: 修改代碼後，網站未更新
**A**: 
1. 保存檔案（Ctrl+S）
2. 刷新瀏覽器（Cmd+R）
3. 清除快取（Cmd+Shift+R）

## 🚀 部署到 Vercel

### 步驟 1：推送到 GitHub

```bash
# 初始化 Git（如未初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 設置遠程倉庫
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送
git push -u origin main
```

### 步驟 2：在 Vercel 部署

1. 訪問 [vercel.com](https://vercel.com)
2. 使用 GitHub 登錄
3. 點擊 "Import Project"
4. 選擇你的 GitHub 倉庫
5. 配置環境變數
6. 點擊 "Deploy"

## 📞 技術支援

如遇問題，請檢查：

1. **Node.js 版本** - 需要 v18 或更高
   ```bash
   node --version
   ```

2. **npm 版本** - 需要 v9 或更高
   ```bash
   npm --version
   ```

3. **依賴是否安裝**
   ```bash
   npm list
   ```

4. **終端日誌** - 查看錯誤消息的詳細信息

## 📚 相關資源

- [Node.js 官方文檔](https://nodejs.org/docs/)
- [Express.js 教程](https://expressjs.com/)
- [Vercel 部署指南](https://vercel.com/docs)
- [CSS 玻璃擬態設計](https://glassmorphism.com/)

---

**祝你開發順利！** 🎉
