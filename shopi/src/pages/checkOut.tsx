// shopi/src/pages/checkOut.tsx
import { useState } from 'react';

const CheckOUT = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi input
    if (!email || !phone) {
      setError('Harap isi semua field');
      return;
    }

    try {
      const data = { email, phone };
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menyimpan kontak');
      }

      setSuccess('Kontak berhasil disimpan!');
      setError(null);
      // Reset form
      setEmail('');
      setPhone('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-lg"
            placeholder="contoh@email.com"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="phone">
            Nomor Telepon:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded-lg"
            placeholder="08123456789"
            pattern="[0-9]{10,13}"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Proses Checkout
        </button>

        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
      </form>
    </div>
  );
};

export default CheckOUT;