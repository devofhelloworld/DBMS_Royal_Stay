const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
  acquireTimeout: 20000
  
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('DB CONNECTION ERROR (will not crash):', err.code || err.message, err);
  } else {
    console.log('DB connected successfully (debug).');
    conn.release();
  }
});

module.exports = pool.promise();