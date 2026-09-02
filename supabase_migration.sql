-- Mawa'eed — Supabase schema migration
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- It is idempotent (safe to run more than once).

-- 1) Add location_type to services so the frontend's "in-person / online / home visit"
--    choice is persisted. Defaults to 'branch' for existing rows.
alter table services
  add column if not exists location_type text default 'branch';

-- Optional: backfill any NULLs to 'branch' (handed over the counter).
update services set location_type = 'branch' where location_type is null;

-- 2) Helpful indexes for the most common lookups (no-op if they already exist).
create index if not exists services_business_id_idx        on services (business_id);
create index if not exists staff_business_id_idx            on staff (business_id);
create index if not exists appointments_business_id_idx     on appointments (business_id);
create index if not exists appointments_date_idx            on appointments (appointment_date);
create index if not exists businesses_slug_idx              on businesses (slug);

-- 3) Make sure demo business + sample data exist (so /b/salon-luxe is never empty).
--    Uses ON CONFLICT so re-running won't create duplicates.
insert into businesses (id, slug, name, industry, template_id, phone, email, address, city,
                       logo_url, cover_url, primary_color, secondary_color, description,
                       trial_start, trial_end, subscription_status, plan_name)
values (
  'biz_salon_luxe', 'salon-luxe', 'صالون الفخامة والروعة للرجال', 'barber', 'luxury-dark',
  '+966551234567', 'info@salonluxe.sa', 'شارع التخصصي، حي العليا', 'الرياض',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
  '#0f172a', '#d97706',
  'أفضل تجربة عناية وحلاقة للرجل العصري. طاقم احترافي وبيئة فاخرة تعكس حضورك.',
  now(), now() + interval '3 years', 'trialing', 'التجربة المجانية (7 أيام)'
)
on conflict (id) do nothing;

-- Sample services (only if the business has none yet).
insert into services (business_id, title, description, duration_min, price, currency, category, location_type)
select * from (values
  ('biz_salon_luxe', 'حلاقة شعر احترافية + تصفيف VIP', 'حلاقة وتنسيق شعر كلاسيكي أو حديث مع غسيل وتصفيف بالمستحضرات الإيطالية.', 45, 90, 'SAR', 'شعر', 'branch'),
  ('biz_salon_luxe', 'تشذيب وتحديد اللحية بالفوطة الساخنة', 'تحديد وتشذيب اللحية باستخدام الفوطة الساخنة والزيوت المغذية.', 30, 60, 'SAR', 'لحية', 'branch'),
  ('biz_salon_luxe', 'باقة العريس والتمّيز الشاملة', 'باقة كاملة تشمل الشعر واللحية وتنظيف البشرة بالأقنعة الطبيعية وشمع الأذن.', 90, 350, 'SAR', 'باقات VIP', 'branch'),
  ('biz_salon_luxe', 'جلسة تنظيف وتغذية البشرة بالبخار', 'جلسة تقشير وتغذية للبشرة لإزالة الخلايا الميتة وإعادة النضارة.', 40, 120, 'SAR', 'عناية', 'branch')
) as v(bid, title, descr, dur, price, cur, cat, loc)
where not exists (select 1 from services where business_id = 'biz_salon_luxe');

-- Sample staff (only if the business has none yet).
insert into staff (business_id, name, role, avatar, phone, is_active)
select * from (values
  ('biz_salon_luxe', 'الكابتن طارق السوري', 'خبير التصفيف والعناية باللحية', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop', '+966551112233', true),
  ('biz_salon_luxe', 'الأسطورة سامر', 'متخصص قصات VIP وعلاجات الشعر', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop', '+966552223344', true)
) as v(bid, name, role, avatar, phone, active)
where not exists (select 1 from staff where business_id = 'biz_salon_luxe');
