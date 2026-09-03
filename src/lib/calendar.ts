/**
 * Dual Gregorian + Hijri (Umm al-Qura style approximation) helpers.
 * Storage remains ISO Gregorian (YYYY-MM-DD). Display shows both calendars.
 */

const HIJRI_MONTHS_AR = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

const GREGORIAN_MONTHS_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const WEEKDAYS_AR = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

export interface HijriDate {
  year: number;
  month: number; // 1-12
  day: number;
}

/** Convert Gregorian date to approximate Hijri (Kuwaiti algorithm — good for display). */
export function gregorianToHijri(gy: number, gm: number, gd: number): HijriDate {
  // Algorithm adapted from the widely used Kuwaiti/Julian conversion
  let y = gy;
  let m = gm;
  let d = gd;

  // Julian Day Number
  if (m < 3) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    b -
    1524.5;

  // Islamic calendar from JDN
  const l = Math.floor(jd - 1948439.5) + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return { year, month, day };
}

/** Parse ISO date string YYYY-MM-DD safely (local, no timezone shift). */
export function parseISODate(iso: string): { y: number; m: number; d: number } | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
}

/** Format Gregorian ISO date in Arabic (e.g. الأحد 15 مارس 2026). */
export function formatGregorianAr(iso: string): string {
  const p = parseISODate(iso);
  if (!p) return iso;
  const date = new Date(p.y, p.m - 1, p.d);
  const weekday = WEEKDAYS_AR[date.getDay()];
  return `${weekday} ${p.d} ${GREGORIAN_MONTHS_AR[p.m - 1]} ${p.y}`;
}

/** Format Hijri date in Arabic (e.g. 15 رمضان 1447 هـ). */
export function formatHijriAr(iso: string): string {
  const p = parseISODate(iso);
  if (!p) return '';
  const h = gregorianToHijri(p.y, p.m, p.d);
  return `${h.day} ${HIJRI_MONTHS_AR[h.month - 1]} ${h.year} هـ`;
}

/** Short dual label for UI: "15 مارس 2026 · 15 رمضان 1447 هـ" */
export function formatDualDate(iso: string): string {
  const p = parseISODate(iso);
  if (!p) return iso;
  const g = `${p.d} ${GREGORIAN_MONTHS_AR[p.m - 1]} ${p.y}`;
  const h = formatHijriAr(iso);
  return `${g} · ${h}`;
}

/** Full dual label with weekday for confirmation screens. */
export function formatDualDateFull(iso: string): string {
  const g = formatGregorianAr(iso);
  const h = formatHijriAr(iso);
  if (!h) return g;
  return `${g} · ${h}`;
}

/** Compact dual for tables: "2026-03-15 · 15 رمضان" */
export function formatDualDateCompact(iso: string): string {
  const p = parseISODate(iso);
  if (!p) return iso;
  const h = gregorianToHijri(p.y, p.m, p.d);
  return `${iso} · ${h.day} ${HIJRI_MONTHS_AR[h.month - 1]}`;
}
