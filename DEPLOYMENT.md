# Mawa'eed — دليل النشر والأمان

## المشكلة التي تم إصلاحها

الـ API بالكامل لم يكن يعمل على Railway لأن Railway كان يشغّل `vite preview` فقط (يخدم الواجهة الثابتة)، بينما دوال الـ `api/` (المصممة لـ Vercel) لم تكن تُشغّل أبداً. النتيجة: أي استدعاء لـ `/api/*` كان يرجع صفحة الـ HTML بدل JSON، فيفشل "إضافة خدمة" و"إنشاء حجز" بصمت.

## ما تم إضافته

- `server.js` — خادم Express يخدم:
  - مسارات `/api/*` (businesses, services, staff, appointments, stats) عبر دوال `api/` الموجودة.
  - ملفات البناء الثابتة من `dist/`.
  - SPA fallback لأي مسار غير API.
- `api/db-client.js` — يفضّل مفتاح الخدمة (service role) إن وُجد، وإلا يستخدم المفتاح العام (anon) الذي يعمل تحت سياسات RLS.
- `railway.json` — يخبر Railway بتشغيل `node server.js` بعد البناء.
- `src/data/currencies.ts` — قائمة عملات لكل الدول العربية (20+ عملة).
- أقسام جديدة في الصفحة الرئيسية: `#features`، `#pricing` (جدول مقارنة الباقات)، `#demo-links`.
- `supabase_migration.sql` — لإضافة عمود `location_type` وزرع بيانات الديمو.

## خطوات النشر على Railway

1. اضبط متغيرات البيئة في Railway (Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` = رابط مشروع Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` = مفتاح خدمة صالح (من Supabase Dashboard → Settings → API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = المفتاح العام (anon/publishable)
   - `PORT` = (اختياري، يحدده Railway تلقائياً)
2. شغّل `supabase_migration.sql` في Supabase Dashboard → SQL Editor (لمرة واحدة).
3. أعِد النشر (Redeploy) على Railway. سيبني المشروع ويشغّل `node server.js`.

## ⚠️ أمان — مهم جداً

- مفتاح الخدمة (`SUPABASE_SERVICE_ROLE_KEY`) القديم كان مُلتزماً في `vercel.json` ضمن مستودع **عام**، وهو غير صالح حالياً ("Unregistered"). هذا يعني أن أي شخص يمكنه رؤيته.
- **الحل:** من Supabase Dashboard → Settings → API → أدر (rotate) مفتاح الخدمة لإنشاء مفتاح جديد، ثم ضعه في Railway كمتغير بيئة فقط (ولا تلتزمه في الكود).
- احذف المفاتيح من `vercel.json` أو استبدلها بقيم وهمية، واعتمد على متغيرات بيئة Railway/Vercel.
- سياسات RLS حالياً تسمح بالكتابة العامة (لذلك يعمل الـ API بالمفتاح العام). لإنتاج حقيقي، اضبط سياسات RLS لتسمح بالكتابة للمستخدمين المصادق عليهم فقط.

## التشغيل محلياً

```bash
npm install
npm run build
npm start          # node server.js على المنفذ 3000
```

اختبر الـ API:
```bash
curl http://localhost:3000/api/health
curl "http://localhost:3000/api/businesses?slug=salon-luxe"
```
