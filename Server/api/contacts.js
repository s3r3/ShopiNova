// Server/api/contacts.js
const express = require("express");
const router = express.Router();
const pool = require("../file");
// Create
router.post("/", (req, res) => {
    const { email, phone } = req.body;

  // Validasi data
  if (!email || !phone) {
    res.status(400).json({ message: "Harap isi semua field" });
    return;
  }

  // Simpan data kontak ke database
  const query = {
    text: "INSERT INTO contacts (email, phone) VALUES ($1, $2) RETURNING *",
    values: [email, phone],
  };

  pool.query(query, (err, results) => {
    if (err) {
    console.error(err);
      res.status(500).json({ message: "Gagal menyimpan kontak" });
    } else {
      res.status(201).json(results.rows[0]);
  }
});
});

// Read
router.get("/", (req, res) => {
  const query = {
    text: "SELECT * FROM contacts",
  };

  pool.query(query, (err, results) => {
    if (err) {
    console.error(err);
      res.status(500).json({ message: "Gagal mengambil data kontak" });
    } else {
      res.json(results.rows);
  }
});
});

// Read by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

  const query = {
    text: "SELECT * FROM contacts WHERE id = $1",
    values: [id],
  };

  pool.query(query, (err, results) => {
    if (err) {
    console.error(err);
      res.status(500).json({ message: "Gagal mengambil data kontak" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ message: "Kontak tidak ditemukan" });
    } else {
      res.json(results.rows[0]);
  }
});
});

// Update
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { email, phone } = req.body;

  // Validasi data
  if (!email || !phone) {
    res.status(400).json({ message: "Harap isi semua field" });
    return;
  }

  const query = {
    text: "UPDATE contacts SET email = $1, phone = $2 WHERE id = $3 RETURNING *",
    values: [email, phone, id],
  };

  pool.query(query, (err, results) => {
    if (err) {
    console.error(err);
      res.status(500).json({ message: "Gagal mengupdate kontak" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ message: "Kontak tidak ditemukan" });
    } else {
      res.json(results.rows[0]);
  }
});
});

// Delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;

  const query = {
    text: "DELETE FROM contacts WHERE id = $1",
    values: [id],
  };

  pool.query(query, (err, results) => {
    if (err) {
    console.error(err);
      res.status(500).json({ message: "Gagal menghapus kontak" });
    } else if (results.rowCount === 0) {
      res.status(404).json({ message: "Kontak tidak ditemukan" });
    } else {
      res.json({ message: "Kontak berhasil dihapus" });
  }
});
});

module.exports = router;