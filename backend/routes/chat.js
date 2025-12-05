/**
 * AI 聊天路由
 * 處理即時聊天客服請求
 */

const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../utils/aiResponse');

/**
 * POST /api/chat
 * 發送消息並獲取 AI 回應
 * @param {Object} body - 請求體
 * @param {string} body.message - 用戶消息
 * @returns {Object} AI 回應
 */
router.post('/', async (req, res, next) => {
  try {
    const { message } = req.body;

    // 驗證消息
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

    // 生成 AI 回應
    const response = await generateAIResponse(message);

    res.status(200).json({
      success: true,
      userMessage: message,
      aiResponse: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
