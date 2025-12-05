/**
 * 主服務器入口檔案
 * 用於本地開發環境
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ 伺服器運行於 http://localhost:${PORT}`);
});
