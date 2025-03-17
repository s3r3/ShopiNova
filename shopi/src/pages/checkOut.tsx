// shopi/src/pages/checkOut.tsx
import axios from "axios";
import { useState } from "react";

/**
 * Checkout page component
 * @returns JSX Element
 */
const CheckOUT = () => {
  // State untuk menyimpan input user
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /**
   * Handle form submit
   * @param e React Form Event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!email || !phone || !firstName || !lastName || !address || !city || !state || !zipCode || !paymentMethod || !cardNumber || !cardName) {
      setError("Harap isi semua field");
      return;
    }

    try {
      // Kirim request ke endpoint API
      const data = {
        email,
        phone,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        paymentMethod,
        cardNumber,
        cardName
      };
      const response = await axios.post("http://localhost:3001/api/contacts", data);

      if (response.status === 200) {
        // Penyimpanan kontak berhasil
        setSuccess("Kontak berhasil disimpan!");
        setError(null);
      } else {
        // Penyimpanan kontak gagal
        setError(response.data.message || "Gagal menyimpan kontak");
        setSuccess(null);
      }

      // Reset form
      setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setState("");
      setZipCode("");
      setPaymentMethod("");
      setCardNumber("");
      setCardName("");
    } catch (err) {
      // Error menyimpan kontak
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setSuccess(null);
    }
  };

  return (
    // Section Checkout
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section Informasi Pengirim */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-lg"
            placeholder="contoh@email.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium mb-2" htmlFor="country">
            Delivery
          </label>
          <input
            id="country"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded-lg"
            placeholder="[MY] Malaysia"
            required
          />
          <div className="flex justify-between">
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="p-2 border rounded-lg w-[266px]"
              required
            />
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="p-2 border rounded-lg w-[266px]"
              required
            />
          </div>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Adress"
            className="p-2 border rounded-lg"
            required
          />

          <div className="flex gap-2 justify-between">
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="p-2 border rounded-lg w-[171px]"
              required
            />
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="p-2 border rounded-lg w-[171px]"
              required
            />
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip Code"
              className="p-2 border rounded-lg w-[171px]"
              required
            />
          </div>
        </div>

        {/* Section Metode Pembayaran */}
        <div className="flex flex-col gap-2">
          <label>Shipping Method</label>
          <div className="flex justify-between">
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Paypall"
              className="p-2 border rounded-lg w-[266px]"
              required
            />
            <input
              type="text"
              name="text"
              id="text"
              placeholder="BCA"
              className="p-2 border rounded-lg w-[266px]"
            />
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Shopee Pay"
              className="p-2 border rounded-lg w-[266px]"
            />
            <input
              type="text"
              name="text"
              id="text"
              placeholder="BRI"
              className="p-2 border rounded-lg w-[266px]"
            />
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Dana"
              className="p-2 border rounded-lg w-[266px]"
            />
            <input
              type="text"
              name="text"
              id="text"
              placeholder="QRIS"
              className="p-2 border rounded-lg w-[266px]"
            />
          </div>
        </div>

        {/* Section Informasi Kartu */}
        <div className="w-550 border-2 p-2 border-black flex flex-col gap-2 rounded-lg">
          <div className="p-2">
            <label htmlFor="Payment">Payment</label>
          </div>
          <input
            type="text"
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="No. Card"
            className="p-2 border-2 border-black rounded-lg w-full"
            required
          />
          <div className="flex justify-between gap-2">
            <input
              type="text"
              name="text"
              id="text"
              placeholder="First Name"
              className="p-2 border rounded-lg w-[266px]"
            />
            <input
              type="text"
              name="text"
              id="text"
              placeholder="QRIS"
              className="p-2 border rounded-lg w-[266px]"
            />
          </div>
          <input
            type="text"
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Name on Card"
            className="p-2 border-2 border-black rounded-lg w-full"
            required
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Pay Now
        </button>

        {/* Error dan Success Message */}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
      </form>
    </div>
  );
};

export default CheckOUT;