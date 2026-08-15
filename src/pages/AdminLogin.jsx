import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { PageWrapper } from '../components/layout/PageWrapper';

const ADMIN_PIN = '7710';

export function AdminLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (pin === ADMIN_PIN) {
      setAuth({ name: 'Admin' });
      navigate('/admin');
      return;
    }

    setError('Incorrect pin. Please try again.');
    setPin('');
  };

  return (
    <PageWrapper>
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-[32px] border border-[#60607A]/10 bg-white p-8 shadow-xl shadow-[#60607A]/10">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D57B03]">Private access</p>
            <h1 className="mt-3 text-4xl font-bold text-[#1a1a1a]">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="pin" className="mb-2 block text-sm font-medium text-[#2D3748]">
                Enter admin pin
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                inputMode="numeric"
                maxLength={4}
                onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 text-lg text-[#1a1a1a] outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#D57B03] to-[#F08A2D] px-5 py-3 font-bold text-white shadow-lg shadow-[#D57B03]/20 transition hover:-translate-y-0.5"
            >
              Enter Admin Panel
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}
