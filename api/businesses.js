import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug, id } = req.query;
      
      if (slug) {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        if (error) throw error;
        return res.status(200).json(data);
      }

      if (id) {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        return res.status(200).json(data);
      }

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const payload = req.body;
      const now = new Date();
      const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days trial

      const newBusiness = {
        id: payload.id || 'biz_' + Date.now().toString(36),
        slug: payload.slug || 'store-' + Math.floor(1000 + Math.random() * 9000),
        name: payload.name || 'متجر المواعيد الجديد',
        industry: payload.industry || 'barber',
        template_id: payload.template_id || 'luxury-dark',
        phone: payload.phone || '+966500000000',
        email: payload.email || 'contact@business.com',
        address: payload.address || 'الرياض، المملكة العربية السعودية',
        city: payload.city || 'الرياض',
        logo_url: payload.logo_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
        cover_url: payload.cover_url || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=400&fit=crop',
        primary_color: payload.primary_color || '#0f172a',
        secondary_color: payload.secondary_color || '#3b82f6',
        description: payload.description || 'منصة حجز المواعيد الأسهل والأسرع للعملاء.',
        trial_start: now.toISOString(),
        trial_end: trialEnd.toISOString(),
        subscription_status: 'trialing',
        plan_name: 'التجربة المجانية (7 أيام)',
        created_at: now.toISOString()
      };

      const { data, error } = await supabase
        .from('businesses')
        .insert(newBusiness)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing business id' });

      const { data, error } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing business id' });

      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Businesses error:', err);
    res.status(500).json({ error: err.message });
  }
}
