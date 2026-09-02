import React, { useState } from 'react';
import { apiUrl } from '../lib/api';
import { Search, Calendar, Phone, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BookingTrackerPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const isCode = query.startsWith('BK-');
      const param = isCode ? `booking_code=${encodeURIComponent(query)}` : `phone=${encodeURIComponent(query)}`;
      
      const res = await fetch(apiUrl(`/api/appointments?${param}`));
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white">الاستعلام عن المواعيد المحجوزة</h1>
          <p className="text-xs text-slate-400 mt-2">
            أدخل رقم الجوال أو كود الحجز (مثل BK-12345) لاستعراض المواعيد وحالتها
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            required
            placeholder="أدخل رقم الجوال أو كود الحجز..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition"
          >
            {loading ? 'جاري البحث...' : 'بحث'}
          </button>
        </form>

        {results && (
          <div className="space-y-4">
            {results.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs bg-slate-900 rounded-2xl border border-slate-800">
                لم يتم العثور على أي مواعيد مطابقة.
              </div>
            ) : (
              results.map((app) => (
                <div key={app.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{app.service_title}</div>
                    <div className="text-slate-400">التاريخ: {app.appointment_date} • {app.appointment_time}</div>
                    <div className="text-amber-400 font-mono mt-1">رمز الحجز: {app.booking_code}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {app.status === 'confirmed' ? 'مؤكد' : app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
