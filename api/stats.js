import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { business_id } = req.query;
    if (!business_id) return res.status(400).json({ error: 'Missing business_id' });

    // Fetch appointments for metrics calculation
    const { data: appointments, error: appError } = await supabase
      .from('appointments')
      .select('*')
      .eq('business_id', business_id);

    if (appError) throw appError;

    const totalBookings = appointments?.length || 0;
    const totalRevenue = appointments
      ?.filter(a => a.status === 'confirmed' || a.status === 'completed')
      .reduce((sum, a) => sum + Number(a.price || 0), 0) || 0;
    
    const pendingCount = appointments?.filter(a => a.status === 'pending').length || 0;
    const confirmedCount = appointments?.filter(a => a.status === 'confirmed').length || 0;
    const completedCount = appointments?.filter(a => a.status === 'completed').length || 0;
    const cancelledCount = appointments?.filter(a => a.status === 'cancelled').length || 0;

    // Service breakdown
    const serviceCounts = {};
    appointments?.forEach(a => {
      const title = a.service_title || 'غير محدد';
      serviceCounts[title] = (serviceCounts[title] || 0) + 1;
    });

    return res.status(200).json({
      totalBookings,
      totalRevenue,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      serviceCounts
    });
  } catch (err) {
    console.error('API Stats error:', err);
    res.status(500).json({ error: err.message });
  }
}
