/**
 * Vercel Serverless API - 聯絡表單
 * /api/contact.js
 */

module.exports = async (req, res) => {
  // 設置 CORS 頭
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 方法' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // 驗證必填欄位
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: '所有欄位都是必填的',
      });
    }

    // 郵箱驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: '無效的郵箱格式',
      });
    }

    console.log('📧 新聯絡表單:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // 這裡可以集成：
    // - 發送郵件通知
    // - 存儲到數據庫
    // - 集成第三方服務

    res.status(200).json({
      success: true,
      message: '感謝您的聯絡，我們會盡快回覆。',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('錯誤:', error);
    res.status(500).json({
      error: error.message || '伺服器內部錯誤',
      timestamp: new Date().toISOString(),
    });
  }
};
