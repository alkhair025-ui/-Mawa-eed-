import { filter } from './store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const { business_id } = req.query;
    let appointments = filter('appointments', () => true);
    if (business_id) appointments = appointments.filter((a) => String(a.business_id) === String(business_id));
    const confirmed = appointments.filter((a) => a.status === 'confirmed' || a.status === 'completed');
    const totalRevenue = confirmed.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    return res.status(200).json({
      totalBookings: appointments.length,
      confirmedCount: appointments.filter((a) => a.status === 'confirmed').length,
      pendingCount: appointments.filter((a) => a.status === 'pending').length,
      waitlistCount: appointments.filter((a) => a.status === 'waitlist').length,
      totalRevenue,
    });
  } catch (err) {
    console.error('API Stats error:', err);
    res.status(500).json({ error: err.message });
  }
}
