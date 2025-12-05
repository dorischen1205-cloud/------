/**
 * 聯絡表單路由
 * 處理聯絡表單提交
 */

const express = require('express');
const router = express.Router();

/**
 * POST /api/contact
 * 提交聯絡表單
 * @param {Object} body - 請求體
 * @param {string} body.name - 聯絡人名稱
 * @param {string} body.email - 聯絡人郵箱
 * @param {string} body.subject - 主題
 * @param {string} body.message - 消息內容
 * @returns {Object} 提交結果
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 驗證必填欄位
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: '所有欄位都是必填的',
      });
    }

    // 簡單的郵箱驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: '無效的郵箱格式',
      });
    }

    // 在這裡可以添加：
    // - 存儲到數據庫
    // - 發送郵件通知
    // - 集成第三方服務

    console.log('📧 新聯絡表單:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: '感謝您的聯絡，我們會盡快回覆。',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
