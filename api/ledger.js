import { getAll, filter, insert, update, remove } from './store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id, type } = req.query;
      let data = getAll('ledger');
      if (business_id) data = data.filter((r) => String(r.business_id) === String(business_id));
      if (type === 'income' || type === 'expense') {
        data = data.filter((r) => r.type === type);
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const payload = req.body || {};
      if (!payload.business_id) return res.status(400).json({ error: 'business_id required' });
      const row = {
        business_id: payload.business_id,
        type: payload.type === 'expense' ? 'expense' : 'income',
        category: payload.category || 'عام',
        title: payload.title || 'قيد',
        amount: Number(payload.amount) || 0,
        currency: payload.currency || 'SYP',
        date: payload.date || new Date().toISOString().slice(0, 10),
        notes: payload.notes || '',
        created_at: new Date().toISOString(),
      };
      return res.status(201).json(insert('ledger', row));
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing id' });
      const data = update('ledger', id, updates);
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing id' });
      remove('ledger', id);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Ledger error:', err);
    res.status(500).json({ error: err.message });
  }
}
