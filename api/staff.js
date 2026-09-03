import { getAll, filter, insert, update, remove } from './store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id } = req.query;
      let data = getAll('staff');
      if (business_id) data = filter('staff', (s) => String(s.business_id) === String(business_id));
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const payload = req.body || {};
      const row = {
        business_id: payload.business_id,
        name: payload.name || 'موظف',
        role: payload.role || 'مختص',
        avatar: payload.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop',
        phone: payload.phone || '',
        is_active: payload.is_active !== false,
      };
      return res.status(201).json(insert('staff', row));
    }
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing staff id' });
      const data = update('staff', id, updates);
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing staff id' });
      remove('staff', id);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Staff error:', err);
    res.status(500).json({ error: err.message });
  }
}
