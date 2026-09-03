/**
 * Local JSON file store — no Supabase / no external DB required.
 * Data lives in ./data/db.json (created automatically).
 * On Railway free dynos the file may reset on redeploy; fine for trial/demo.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'db.json');

function seed() {
  const now = new Date().toISOString();
  const trialEnd = new Date(Date.now() + 7 * 86400000).toISOString();
  return {
    businesses: [
      {
        id: 'biz_salon_luxe',
        slug: 'salon-luxe',
        name: 'صالون لوكس',
        industry: 'barber',
        template_id: 'luxury-dark',
        phone: '+963991234567',
        email: 'info@salon-luxe.sy',
        address: 'شارع بغداد',
        city: 'دمشق',
        logo_url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
        cover_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
        primary_color: '#0f172a',
        secondary_color: '#d97706',
        description: 'صالون حلاقة وتجميل — احجز موعدك بسهولة.',
        currency: 'SYP',
        trial_start: now,
        trial_end: trialEnd,
        subscription_status: 'trialing',
        plan_name: 'التجربة المجانية (7 أيام)',
        access_pin: '1234',
        slot_interval_min: 30,
        timezone: 'Asia/Damascus',
        payment_settings: null,
        accounting_enabled: false,
        working_hours: null,
        created_at: now,
      },
    ],
    services: [
      {
        id: 1,
        business_id: 'biz_salon_luxe',
        title: 'قص شعر رجالي',
        description: 'قصة احترافية مع عناية',
        price: 80,
        duration_min: 45,
        category: 'شعر',
        currency: 'SYP',
        image_url: '',
        location_type: 'branch',
      },
      {
        id: 2,
        business_id: 'biz_salon_luxe',
        title: 'حلاقة ذقن',
        description: 'تشذيب وعناية بالذقن',
        price: 40,
        duration_min: 20,
        category: 'ذقن',
        currency: 'SYP',
        image_url: '',
        location_type: 'branch',
      },
      {
        id: 3,
        business_id: 'biz_salon_luxe',
        title: 'استشارة أونلاين',
        description: 'جلسة عبر الاتصال',
        price: 50,
        duration_min: 30,
        category: 'أونلاين',
        currency: 'SYP',
        image_url: '',
        location_type: 'online',
      },
    ],
    staff: [
      {
        id: 1,
        business_id: 'biz_salon_luxe',
        name: 'أحمد العتيبي',
        role: 'حلاق أول',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop',
        phone: '',
        is_active: true,
      },
      {
        id: 2,
        business_id: 'biz_salon_luxe',
        name: 'خالد الشمري',
        role: 'مختص تجميل',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop',
        phone: '',
        is_active: true,
      },
    ],
    appointments: [],
    ledger: [],
    _seq: { services: 10, staff: 10, appointments: 100, ledger: 1 },
  };
}

function ensureDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seed(), null, 2), 'utf8');
  }
}

function read() {
  ensureDb();
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch {
    const s = seed();
    write(s);
    return s;
  }
}

function write(db) {
  ensureDb();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

export function getAll(table) {
  const db = read();
  return Array.isArray(db[table]) ? db[table] : [];
}

export function findOne(table, predicate) {
  return getAll(table).find(predicate) || null;
}

export function filter(table, predicate) {
  return getAll(table).filter(predicate);
}

export function insert(table, row) {
  const db = read();
  if (!Array.isArray(db[table])) db[table] = [];
  if (row.id == null && db._seq && db._seq[table] != null) {
    db._seq[table] += 1;
    row.id = db._seq[table];
  }
  db[table].unshift(row);
  write(db);
  return row;
}

export function update(table, id, updates) {
  const db = read();
  if (!Array.isArray(db[table])) return null;
  const idx = db[table].findIndex((r) => String(r.id) === String(id));
  if (idx === -1) return null;
  db[table][idx] = { ...db[table][idx], ...updates, id: db[table][idx].id };
  write(db);
  return db[table][idx];
}

export function remove(table, id) {
  const db = read();
  if (!Array.isArray(db[table])) return false;
  const before = db[table].length;
  db[table] = db[table].filter((r) => String(r.id) !== String(id));
  write(db);
  return db[table].length < before;
}

export function resetSeed() {
  write(seed());
}
