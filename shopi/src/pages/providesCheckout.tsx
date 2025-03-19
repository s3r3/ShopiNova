import { ReactNode, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R2z4lJiew9lcVGNvyrPKgGMTp3hOSFe0sJxVtbuaRhT5c0ujuq7vkDKdxCuVfTp0d8wrr5KjqDxli6tLOkm1jBV00BxZIMMW1"); // Ganti dengan publishable key Stripe

const StripeProvider = ({ children }: { children: ReactNode }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, currency: "usd" }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return clientSecret ? (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      {children}
    </Elements>
  ) : (
    <p>Loading payment...</p>
  );
};

export default StripeProvider;
