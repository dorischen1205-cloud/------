# 🚀 Vercel 部署指南

## 前置要求

1. GitHub 帳戶
2. Vercel 帳戶（可用 GitHub 登錄）
3. Git 已安裝

## 步驟 1：準備代碼

### 初始化 Git 倉庫

```bash
cd /Users/shu/Desktop/未命名檔案夾

# 初始化 Git
git init

# 配置 Git（首次使用）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit: Company website with AI chatbot"
```

## 步驟 2：上傳到 GitHub

### 創建新倉庫

1. 訪問 [github.com](https://github.com)
2. 登錄帳戶
3. 點擊 **+** 按鈕 → **New repository**
4. 填寫：
   - Repository name: `company-website-ai-chatbot`
   - Description: `企業官網 + AI 客服系統`
   - 選擇 Public
5. 點擊 **Create repository**

### 推送代碼

```bash
# 添加遠程倉庫（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/company-website-ai-chatbot.git

# 重命名分支（如需要）
git branch -M main

# 推送代碼
git push -u origin main
```

## 步驟 3：在 Vercel 部署

### 連接 Vercel

1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 **Sign Up** 使用 GitHub 登錄
3. 授予 Vercel 訪問權限

### 導入項目

1. 在 Vercel 儀表板，點擊 **Add New** → **Project**
2. 點擊 **Import Git Repository**
3. 尋找並選擇 `company-website-ai-chatbot`
4. 點擊 **Import**

### 配置環境變數

1. 在 **Environment Variables** 部分，添加：

```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-url.vercel.app
```

2. 點擊 **Deploy**

### 等待部署

- 部署通常需要 1-2 分鐘
- 看到 **Congratulations!** 頁面即部署成功

## 步驟 4：配置域名（可選）

### 使用 Vercel 提供的域名

- Vercel 會自動分配一個 URL，格式如：`https://company-website-ai-chatbot.vercel.app`

### 連接自定義域名

1. 在項目設置中進入 **Domains**
2. 輸入你的域名
3. 按照說明配置 DNS

## 🔧 環境變數配置

### Vercel 環境變數

在 Vercel 項目設置中：

```
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

### 本地開發

編輯 `.env`：

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 📡 測試部署

### 檢查部署狀態

1. 訪問你的 Vercel URL
2. 應該看到企業官網頁面
3. 測試 AI 聊天功能
4. 測試聯絡表單

### API 端點

部署後可訪問：

```
GET  https://your-domain.vercel.app/api/health
POST https://your-domain.vercel.app/api/chat
POST https://your-domain.vercel.app/api/contact
```

## 🔄 持續部署

### 自動部署

- 每次 push 到 `main` 分支自動觸發部署
- 查看 Vercel 儀表板的部署歷史

### 手動重新部署

1. 在 Vercel 項目頁面
2. 點擊 **Redeploy** 按鈕

## 🚨 常見問題

### Q: 部署失敗
**A**: 檢查以下項目：
- `vercel.json` 語法是否正確
- 所有依賴是否在 `package.json` 中
- 環境變數是否已配置

### Q: API 404 錯誤
**A**: 確保：
- `/api` 文件夾和處理程序已上傳
- `vercel.json` 配置了正確的重寫規則

### Q: CORS 錯誤
**A**: 更新 `CORS_ORIGIN` 環境變數：
```
CORS_ORIGIN=https://your-domain.vercel.app
```

### Q: 無法訪問靜態文件
**A**: 確認 `outputDirectory` 在 `vercel.json` 中設置為 `public`

## 📊 監控和日誌

### 查看部署日誌

1. 進入 Vercel 項目
2. 點擊 **Deployments**
3. 選擇部署版本
4. 查看 **Build logs** 和 **Runtime logs**

### 查看性能

- Vercel 儀表板提供性能指標
- 監控 API 響應時間

## 🔐 安全建議

1. **不要提交密鑰** - 使用環境變數
2. **啟用 HTTPS** - Vercel 自動提供
3. **定期更新依賴** - 運行 `npm audit fix`

## 📞 支援

- [Vercel 文檔](https://vercel.com/docs)
- [Vercel GitHub 集成](https://vercel.com/docs/concepts/git)

---

部署完成後，你的企業官網將在全球 CDN 上運行！🌍
