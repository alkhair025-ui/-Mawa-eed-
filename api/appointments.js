import { getAll, filter, findOne, insert, update, remove } from './store.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { business_id, date, status, phone, booking_code } = req.query;
      let data = getAll('appointments');
      if (business_id) data = data.filter((a) => String(a.business_id) === String(business_id));
      if (date) data = data.filter((a) => a.appointment_date === date);
      if (status) data = data.filter((a) => a.status === status);
      if (phone) data = data.filter((a) => a.customer_phone === phone);
      if (booking_code) data = data.filter((a) => a.booking_code === booking_code);
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const payload = req.body || {};
      const code = 'BK-' + Math.floor(10000 + Math.random() * 90000);
      const requestedStatus = payload.status || 'confirmed';

      if (requestedStatus !== 'waitlist') {
        const conflicts = filter('appointments', (a) => {
          if (String(a.business_id) !== String(payload.business_id)) return false;
          if (a.appointment_date !== payload.appointment_date) return false;
          if (a.appointment_time !== payload.appointment_time) return false;
          if (a.status !== 'confirmed' && a.status !== 'pending') return false;
          if (payload.staff_id && a.staff_id && String(a.staff_id) !== String(payload.staff_id)) return false;
          return true;
        });
        if (conflicts.length > 0) {
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
        created_at: new Date().toISOString(),
        deposit_amount: Number(payload.deposit_amount) || 0,
        payment_method: payload.payment_method || '',
        payment_status: payload.payment_status || 'not_required',
        payment_ref: payload.payment_ref || '',
      };
      return res.status(201).json(insert('appointments', newAppointment));
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing appointment id' });
      if (updates.status === 'confirmed') {
        const current = findOne('appointments', (a) => String(a.id) === String(id));
        if (current) {
          const conflicts = filter('appointments', (a) => {
            if (String(a.id) === String(id)) return false;
            if (String(a.business_id) !== String(current.business_id)) return false;
            if (a.appointment_date !== current.appointment_date) return false;
            if (a.appointment_time !== current.appointment_time) return false;
            if (a.status !== 'confirmed' && a.status !== 'pending') return false;
            if (current.staff_id && a.staff_id && String(a.staff_id) !== String(current.staff_id)) return false;
            return true;
          });
          if (conflicts.length > 0) {
            return res.status(409).json({ error: 'slot_taken', message: 'لا يمكن التأكيد — الوقت ما زال محجوزاً' });
          }
        }
      }
      const data = update('appointments', id, updates);
      if (!data) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'Missing appointment id' });
      remove('appointments', id);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Appointments error:', err);
    res.status(500).json({ error: err.message });
  }
}
