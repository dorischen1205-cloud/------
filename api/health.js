/**
 * Vercel Serverless API - 健康檢查
 * /api/health.js
 */

module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '伺服器運行正常',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
