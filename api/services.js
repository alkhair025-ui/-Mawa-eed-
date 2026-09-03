import { getAll, filter, insert, update, remove } from './store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id } = req.query;
      let data = getAll('services');
      if (business_id) data = filter('services', (s) => String(s.business_id) === String(business_id));
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const payload = req.body || {};
      const row = {
        business_id: payload.business_id,
        title: payload.title || 'خدمة جديدة',
        description: payload.description || '',
        price: Number(payload.price) || 0,
        duration_min: Number(payload.duration_min) || 30,
        category: payload.category || 'عامة',
        currency: payload.currency || 'SAR',
        image_url: payload.image_url || '',
        location_type: payload.location_type || 'branch',
      };
      return res.status(201).json(insert('services', row));
    }
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing service id' });
      const data = update('services', id, updates);
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing service id' });
      remove('services', id);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Services error:', err);
    res.status(500).json({ error: err.message });
  }
}
