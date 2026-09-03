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
      const requestedStatus = payload.status || 'confirmed';

      // --- Conflict check (only for confirmed / pending, not waitlist) ---
      if (requestedStatus !== 'waitlist') {
        let conflictQuery = supabase
          .from('appointments')
          .select('id, customer_name, staff_id, staff_name, status')
          .eq('business_id', payload.business_id)
          .eq('appointment_date', payload.appointment_date)
          .eq('appointment_time', payload.appointment_time)
          .in('status', ['confirmed', 'pending']);

        // If a specific staff is chosen, conflict only on that staff
        if (payload.staff_id) {
          conflictQuery = conflictQuery.eq('staff_id', payload.staff_id);
        }

        const { data: conflicts, error: conflictError } = await conflictQuery;
        if (conflictError) throw conflictError;

        if (conflicts && conflicts.length > 0) {
          return res.status(409).json({
            error: 'slot_taken',
            message: 'هذا الوقت محجوز مسبقاً',
            conflicts,
            suggestion: 'waitlist',
          });
        }
      }

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
        status: requestedStatus,
        notes: payload.notes || '',
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

      // If promoting waitlist → confirmed, check conflict again
      if (updates.status === 'confirmed') {
        const { data: current } = await supabase
          .from('appointments')
          .select('*')
          .eq('id', id)
          .single();

        if (current) {
          let conflictQuery = supabase
            .from('appointments')
            .select('id')
            .eq('business_id', current.business_id)
            .eq('appointment_date', current.appointment_date)
            .eq('appointment_time', current.appointment_time)
            .in('status', ['confirmed', 'pending'])
            .neq('id', id);

          if (current.staff_id) {
            conflictQuery = conflictQuery.eq('staff_id', current.staff_id);
          }

          const { data: conflicts } = await conflictQuery;
          if (conflicts && conflicts.length > 0) {
            return res.status(409).json({
              error: 'slot_taken',
              message: 'لا يمكن التأكيد — الوقت ما زال محجوزاً',
            });
          }
        }
      }

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
