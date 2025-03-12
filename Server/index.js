// Server/index.js (untuk mengintegrasikan Express)
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const dataBaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(dataBaseConfig);
app.use(express.json());
const server = require('./server');

server(server);
app.listen(port, () => {
  console.log(`Server sedang berjalan pada port ${port}`);
});