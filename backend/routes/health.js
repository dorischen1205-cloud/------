/**
 * 健康檢查路由
 * 用於監控伺服器狀態
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * 返回伺服器健康狀態
 * @returns {Object} 健康狀態信息
 */
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      status: 'ok',
      message: '伺服器運行正常',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router;
