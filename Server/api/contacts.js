// Server/api/contacts.js
const express = require("express");
const router = express.Router();
const pool = require("../file"); // asumsi file pool terletak di folder yang sama dengan server.js

// Create
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal mengambil data kontak" });
  }
});

// Read by ID
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;