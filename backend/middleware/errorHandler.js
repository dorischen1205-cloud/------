/**
 * 全局錯誤處理中介層
 * 捕獲並處理應用中的所有錯誤
 */

/**
 * 錯誤處理中介層
 * @param {Error} err - 錯誤對象
 * @param {Object} req - Express 請求對象
 * @param {Object} res - Express 響應對象
 * @param {Function} next - Express next 函數
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ 錯誤:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || '伺服器內部錯誤';

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
