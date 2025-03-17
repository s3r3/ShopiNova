const express = require("express");
const router = express.Router();
const pool = require("../file");

router.post("/", (req, res) => {
    const {country, first_name, last_name,address,city,state, zip_code}= req.body;
    if (!country || !first_name || !last_name || !address || !city || !state || !zip_code) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }
    const query = {
        text: "INSERT INTO deliveries (country, first_name, last_name, address, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        values: [country, first_name, last_name, address, city, state, zip_code],
    };
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to save delivery" });
        } else {
            res.status(201).json(results.rows[0]);
        }
    });
})

router.get("/", (req, res) => {
    const query = {
        text: "SELECT * FROM deliveries",
    };
    pool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve delivery data" });
        } else {
            res.json(results.rows);
        }
    });
});
module.exports = router;