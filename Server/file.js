// server.js/server.ts
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: '3YD7823',
    port: 5432,
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('error:', err);
    console.log('Koneksi database gagal');
  } else {
    console.log('Koneksi database berhasil');
  }
});

module.exports = pool;
module.exports = pool;