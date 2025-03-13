// shopi/src/pages/checkOut.tsx
import { useState } from "react";

const CheckOUT = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (!email || !phone) {
      setError("Harap isi semua field");
      return;
    }

    try {
      const data = { email, phone };
      const response = await fetch("http://localhost:3001/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal menyimpan kontak");
      }

      setSuccess("Kontak berhasil disimpan!");
      setError(null);
      // Reset form
      setEmail("");
      setPhone("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      {/* section left */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className=" flex justify-between ">
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" First Name"
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" Last Name"
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>

            <input
              type="text"
              placeholder="Adress"
              className="p-2 border rounded-lg"
            />

            <div className=" flex gap-2 justify-between">
              <input
                type="text"
                name="text"
                id="text"
                placeholder="City"
                className="p-2 border rounded-lg w-[171px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" State"
                className="p-2 border rounded-lg w-[171px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" Zip Code"
                className="p-2 border rounded-lg w-[171px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-black" />
            <p className="text-lg">Save This Information For Next Time</p>
          </div>

          <div className="flex flex-col gap-2">
            <label> Shipping Method</label>
            <div className=" flex justify-between ">
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" Paypall"
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" BCA"
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>
            <div className=" flex justify-between ">
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" Shopee Pay"
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" BRI"
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>
            <div className=" flex justify-between ">
              <input
                type="Dana"
                name="text"
                id="text"
                placeholder=" First Name"
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" QRIS"
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>
          </div>

          <div className="w-550 border-2 p-2  border-black flex flex-col gap-2 rounded-lg">
            <div className="p-2">
              <label htmlFor="Payment">Payment</label>
            </div>
            {/* <div className="w-[550px]  h-[1px] bg-black"/> */}
            <input
              type="text"
              placeholder="No. Card"
              className="p-2 border-2 border-black rounded-lg w-full"
            />
            <div className=" flex justify-between gap-2">
            <input
                type="Dana"
                name="text"
                id="text"
                placeholder=" First Name"
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="text"
                id="text"
                placeholder=" QRIS"
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>
            <input
              type="text"
              placeholder="Name on Card"
              className="p-2 border-2 border-black rounded-lg w-full input  "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
           Pay Now
          </button>

          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default CheckOUT;
