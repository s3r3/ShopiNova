// shopi/src/pages/checkOut.tsx
import axios from "axios";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const CheckOUT = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Periksa nilai input
    console.log("Nilai input:", {
      email,
      phone,
      countryId,
      stateId,
      address,
      city,
      zipCode,
      firstName,
      lastName,
    });
    try {
      const contactData = { email, phone };
      const deliveryData = {
        country: countryid,
        state: stateid,
        address,
        city,
        zip_code: zipCode,
        first_name: firstName,
        last_name: lastName,
      };

      const [responseContact, responseDelivery] = await Promise.all([
        axios.post("http://localhost:3001/api/contacts", contactData),
        axios.post("http://localhost:3001/api/deliveries", deliveryData),
      ]);

      // Periksa respons server
      console.log("Respons server:", {
        responseContact,
        responseDelivery,
      });

      if (responseContact.status !== 200 || responseDelivery.status !== 200) {
        throw new Error("Gagal menyimpan data");
      }

      setSuccess("Data berhasil disimpan!");
      setError(null);
      // Reset form
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setZipCode("");
      setFirstName("");
      setLastName("");
      setCountryId("");
      setStateId("");
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
            <CountrySelect
              onChange={(e) => {
                const state = e as { id: number; name: string };
                setCountryid(state.id);
                setCountryId(state.name);
              }}
              placeHolder="Select Country"
              className="p-2 border rounded-lg"
            />
            <div className=" flex justify-between ">
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder=" First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border rounded-lg   w-[266px]"
              />
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder=" Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 border rounded-lg w-[266px]"
              />
            </div>

            <input
              type="text"
              name="address"
              id="address"
              placeholder="Adress"
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border rounded-lg"
            />

            <div className=" flex gap-2 justify-between">
              <StateSelect
                disabled={!countryid}
                countryid={countryid}
                onChange={(e) => {
                  const state = e as { id: number; name: string };
                  setstateid(state.id);
                  setStateId(state.name)
                }}
                placeHolder="Select State"
                className="p-2 border rounded-lg w-[171px]"
              />
              <CitySelect
                disabled={!stateid}
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  const state = e as { id: number; name: string };
                  console.log(state.id);
                  setCity(state.name);
                }}
                placeHolder="Select City"
                className="p-2 border rounded-lg w-[171px]"
              />
              <input
                type="text"
                name="zip_code"
                id="zip_code"
                placeholder=" Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
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