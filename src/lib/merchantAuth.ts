/** Simple merchant PIN auth (localStorage). Not a replacement for full Auth later. */

const PREFIX = 'mawa_merchant_auth_';

export function getStoredSession(slug: string): boolean {
  try {
    const raw = localStorage.getItem(PREFIX + slug);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data?.ok || !data?.exp) return false;
    if (Date.now() > data.exp) {
      localStorage.removeItem(PREFIX + slug);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function setSession(slug: string, days = 14) {
  const exp = Date.now() + days * 24 * 60 * 60 * 1000;
  localStorage.setItem(PREFIX + slug, JSON.stringify({ ok: true, exp }));
}

export function clearSession(slug: string) {
  localStorage.removeItem(PREFIX + slug);
}

/** Default PIN if business has none configured */
export const DEFAULT_MERCHANT_PIN = '1234';

export function verifyPin(input: string, businessPin?: string | null): boolean {
  const expected = (businessPin && String(businessPin).trim()) || DEFAULT_MERCHANT_PIN;
  return String(input).trim() === expected;
}
