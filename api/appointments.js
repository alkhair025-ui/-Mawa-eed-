import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id, date, status, phone, booking_code } = req.query;
      let query = supabase.from('appointments').select('*');

      if (business_id) query = query.eq('business_id', business_id);
      if (date) query = query.eq('appointment_date', date);
      if (status) query = query.eq('status', status);
      if (phone) query = query.eq('customer_phone', phone);
      if (booking_code) query = query.eq('booking_code', booking_code);

      const { data, error } = await query.order('id', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const payload = req.body;
      const code = 'BK-' + Math.floor(10000 + Math.random() * 90000);

      const newAppointment = {
        business_id: payload.business_id,
        booking_code: code,
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        customer_email: payload.customer_email || '',
        service_id: payload.service_id,
        service_title: payload.service_title,
        staff_id: payload.staff_id || null,
        staff_name: payload.staff_name || 'أي موظف متاح',
        appointment_date: payload.appointment_date,
        appointment_time: payload.appointment_time,
        price: payload.price || 0,
        status: payload.status || 'confirmed',
        notes: payload.notes || ''
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert(newAppointment)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing appointment id' });

      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing appointment id' });

      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Appointments error:', err);
    res.status(500).json({ error: err.message });
  }
}
