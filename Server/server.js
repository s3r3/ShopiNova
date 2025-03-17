// Server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001; 
const stripeRouter = require("./api/stripe");
const contactsRouter = require("./api/contacts");
const deliveriesRouter = require("./api/deliveries");


// Middleware
app.use(cors());
app.use(express.json());

// Router
app.use("/api/contacts", contactsRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/deliveries", deliveriesRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
