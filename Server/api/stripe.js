// Server/api/stripe.js
const express = require("express");
const router = express.Router();
const { STRIPE_SECRET_KEY } = require("../config/stripeConfig");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// API untuk membuat token Stripe
router.post("/create-token", async (req, res) => {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: req.body.number,
        exp_month: req.body.exp_month,
        exp_year: req.body.exp_year,
        cvc: req.body.cvc,
      },
    });
    res.json(token);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal membuat token" });
  }
});

// API untuk membuat charge Stripe
router.post("/create-charge", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      source: req.body.source,
      description: req.body.description,
    });
    res.json(charge);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal membuat charge" });
  }
});

// API untuk membuat customer Stripe
router.post("/create-customer", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      description: req.body.description,
    });
    res.json(customer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal membuat customer" });
  }
});

// API untuk membuat subscription Stripe
router.post("/create-subscription", async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customer,
      items: [
        {
          plan: req.body.plan,
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
      },
    });
    res.json(subscription);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal membuat subscription" });
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { email, name } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal membuat pembayaran" });
  }
});
router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Gagal membuat payment intent",
    });
  }
});

// Tambahkan route untuk menguji apakah server berjalan
router.get("/", (req, res) => {
  res.json({ message: "Server Stripe berjalan" });
});

module.exports = router;
