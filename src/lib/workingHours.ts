/** Working hours helpers — generate bookable slots from a weekly schedule. */

export type DayKey = '0' | '1' | '2' | '3' | '4' | '5' | '6'; // 0 = Sunday

export interface DaySchedule {
  open: boolean;
  start: string; // "09:00"
  end: string;   // "21:00"
}

export type WeeklyHours = Record<DayKey, DaySchedule>;

export const DEFAULT_WEEKLY_HOURS: WeeklyHours = {
  '0': { open: true, start: '10:00', end: '22:00' },  // الأحد
  '1': { open: true, start: '10:00', end: '22:00' },
  '2': { open: true, start: '10:00', end: '22:00' },
  '3': { open: true, start: '10:00', end: '22:00' },
  '4': { open: true, start: '10:00', end: '22:00' },
  '5': { open: true, start: '16:00', end: '23:00' }, // الجمعة غالباً بعد العصر
  '6': { open: true, start: '10:00', end: '22:00' },
};

export const DAY_NAMES_AR: Record<DayKey, string> = {
  '0': 'الأحد',
  '1': 'الإثنين',
  '2': 'الثلاثاء',
  '3': 'الأربعاء',
  '4': 'الخميس',
  '5': 'الجمعة',
  '6': 'السبت',
};

function parseHM(hm: string): number {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + (m || 0);
}

function formatHM(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Display label like 10:00 ص / 04:30 م */
export function formatSlotLabel(hm: string): string {
  const [hStr, mStr] = hm.split(':');
  let h = Number(hStr);
  const m = mStr || '00';
  const isPM = h >= 12;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, '0')}:${m} ${isPM ? 'م' : 'ص'}`;
}

/**
 * Generate slots for a Gregorian ISO date based on weekly hours.
 * intervalMin defaults to 30. durationMin reserved for future end-time blocking.
 */
export function generateSlotsForDate(
  isoDate: string,
  weekly: WeeklyHours = DEFAULT_WEEKLY_HOURS,
  intervalMin = 30
): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return [];
  let day: number;
  try {
    const w = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Damascus',
      weekday: 'short',
    }).format(new Date(`${isoDate}T12:00:00Z`));
    const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    day = map[w] ?? 0;
  } catch {
    const [y, mo, d] = isoDate.split('-').map(Number);
    day = new Date(y, mo - 1, d).getDay();
  }
  const key = String(day) as DayKey;
  const sch = weekly[key] || DEFAULT_WEEKLY_HOURS[key];
  if (!sch?.open) return [];

  const start = parseHM(sch.start);
  const end = parseHM(sch.end);
  if (end <= start) return [];

  const slots: string[] = [];
  for (let t = start; t + intervalMin <= end; t += intervalMin) {
    slots.push(formatHM(t));
  }
  return slots;
}

export function isDayOpen(isoDate: string, weekly: WeeklyHours = DEFAULT_WEEKLY_HOURS): boolean {
  return generateSlotsForDate(isoDate, weekly).length > 0;
}

/** Parse weekly hours from JSON string or object; fall back to defaults. */
export function parseWeeklyHours(raw: unknown): WeeklyHours {
  try {
    const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!obj || typeof obj !== 'object') return { ...DEFAULT_WEEKLY_HOURS };
    const result = { ...DEFAULT_WEEKLY_HOURS };
    (Object.keys(result) as DayKey[]).forEach((k) => {
      if (obj[k] && typeof obj[k] === 'object') {
        result[k] = {
          open: Boolean(obj[k].open),
          start: obj[k].start || '10:00',
          end: obj[k].end || '22:00',
        };
      }
    });
    return result;
  } catch {
    return { ...DEFAULT_WEEKLY_HOURS };
  }
}
