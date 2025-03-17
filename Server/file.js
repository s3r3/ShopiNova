// Server/Databases/file.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error("error:", err);
    console.log("Koneksi database gagal");
  } else {
    console.log("Koneksi database berhasil");
  }
});

module.exports = pool;
