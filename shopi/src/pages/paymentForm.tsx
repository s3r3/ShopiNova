// shopi/src/pages/paymentForm.tsx
import React, { useState, useEffect } from "react";
import { loadStripe, Stripe, StripeCardElement } from "@stripe/stripe-js";
import { StripeElements } from '@stripe/stripe-js';

interface Props {
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ onPaymentSuccess }: Props) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = React.useState<StripeElements | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const STRIPE_PUBLISHABLE_KEY = "pk_test_51R2z4lJiew9lcVGNvyrPKgGMTp3hOSFe0sJxVtbuaRhT5c0ujuq7vkDKdxCuVfTp0d8wrr5KjqDxli6tLOkm1jBV00BxZIMMW1";
    loadStripe(STRIPE_PUBLISHABLE_KEY).then((stripe) => {
      console.log('Stripe loaded:', stripe);
      if (stripe) {
        setStripe(stripe);
        setElements(stripe.elements());
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      } catch (err: unknown) {
        if (err instanceof Error) {
        console.error(err);
        setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('Unknown error');
      }
      }
  };

  const handlePayment = async () => {
    try {
      const card = elements?.create('card');
      card?.mount('#card');
      const result = await (stripe as Stripe).confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card as StripeCardElement,
            billing_details: {
              name,
              email,
            },
          },
        }
  );
      if (result.error) {
        throw result.error;
      } else {
        onPaymentSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Unknown error');
      }
    }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-lg shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">Pembayaran dengan Stripe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nama
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Bayar Sekarang
        </button>
      </form>
      {clientSecret && (
        <div className="flex flex-col gap-4">
          <div id="card" className="p-2 border border-gray-400 rounded h-10 " />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={handlePayment}
          >
            Konfirmasi Pembayaran
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PaymentForm;