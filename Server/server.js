// Server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001; // Sesuaikan dengan port yang digunakan di frontend
const stripeRouter = require("./api/stripe");
const contactsRouter = require("./api/contacts");



// Middleware
app.use(cors());
app.use(express.json());

// Router
app.use("/api/contacts", contactsRouter);
app.use("/api/stripe", stripeRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
