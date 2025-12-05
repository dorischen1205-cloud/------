/**
 * Express 應用配置
 * 設置所有中介層、路由和錯誤處理
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');
const corsMiddleware = require('./middleware/corsMiddleware');

// 路由
const healthRoutes = require('./routes/health');
const chatRoutes = require('./routes/chat');
const contactRoutes = require('./routes/contact');

const app = express();

// 中介層
app.use(cors(corsMiddleware));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 靜態文件服務
app.use(express.static(path.join(__dirname, '../public')));

// API 路由
app.use('/api/health', healthRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contact', contactRoutes);

// 根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 處理
app.use((req, res) => {
  res.status(404).json({ error: '路由未找到' });
});

// 錯誤處理中介層
app.use(errorHandler);

module.exports = app;
