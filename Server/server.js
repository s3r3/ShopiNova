// Server/server.js (versi 2)
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Port yang digunakan oleh client
const { Pool } = require('pg');

// Databases
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: '3YD7823',
  port: 5432,
});
// Middleware
app.use(cors());
app.use(express.json());

// CRUD API

// Create
app.post("/api/contacts", async (req, res) => {
  try {
    const { email, phone } = req.body;
    const result = await pool.query(
      "INSERT INTO contacts (email, phone) VALUES ($1, $2) RETURNING *",
      [email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal mengambil data kontak" });
  }
});

// Read
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal mengambil data kontak" });
  }
});

// Read by ID
app.get("/api/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal mengambil data kontak" });
  }
});

// Update
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone } = req.body;
    const result = await pool.query(
      "UPDATE contacts SET email = $1, phone = $2 WHERE id = $3 RETURNING *",
      [email, phone, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal mengupdate kontak" });
  }
});

// Delete
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Kontak tidak ditemukan" });
    }
    res.json({ message: "Kontak berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal menghapus kontak" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});