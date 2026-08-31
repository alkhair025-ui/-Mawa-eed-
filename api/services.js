import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id } = req.query;
      let query = supabase.from('services').select('*');
      if (business_id) {
        query = query.eq('business_id', business_id);
      }
      const { data, error } = await query.order('id', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const payload = req.body;
      const { data, error } = await supabase
        .from('services')
        .insert({
          business_id: payload.business_id,
          title: payload.title,
          description: payload.description || '',
          duration_min: payload.duration_min || 30,
          price: payload.price || 0,
          currency: payload.currency || 'SAR',
          category: payload.category || 'العامة',
          image_url: payload.image_url || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&fit=crop'
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing service id' });

      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing service id' });

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Services error:', err);
    res.status(500).json({ error: err.message });
  }
}
