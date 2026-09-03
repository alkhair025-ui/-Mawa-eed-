/** Syria / Damascus timezone helpers (Asia/Damascus). */

export const APP_TIMEZONE = 'Asia/Damascus';

/** Today's date YYYY-MM-DD in Damascus. */
export function todayISOInDamascus(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: APP_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/** Format a Date or ISO string for display in Damascus. */
export function formatInDamascus(
  input: Date | string,
  opts?: Intl.DateTimeFormatOptions
): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('ar-SY', {
    timeZone: APP_TIMEZONE,
    ...opts,
  }).format(d);
}

/** Current hour:minute in Damascus as "HH:MM". */
export function nowTimeInDamascus(): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: APP_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const h = parts.find((p) => p.type === 'hour')?.value || '00';
    const m = parts.find((p) => p.type === 'minute')?.value || '00';
    return `${h}:${m}`;
  } catch {
    const n = new Date();
    return `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
  }
}

/** Weekday 0-6 (Sun-Sat) for an ISO date as observed in Damascus. */
export function weekdayInDamascus(isoDate: string): number {
  // Noon UTC avoids edge DST issues for pure calendar dates
  const d = new Date(`${isoDate}T12:00:00`);
  const w = new Intl.DateTimeFormat('en-US', {
    timeZone: APP_TIMEZONE,
    weekday: 'short',
  }).format(d);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[w] ?? d.getDay();
}
