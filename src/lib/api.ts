// Centralized API base URL.
//
// In production (Railway/Vercel) this is empty, so calls go to the same origin
// (relative "/api/...") and are served by the Express server / serverless funcs.
//
// For static previews deployed via the platform, set VITE_API_BASE to the
// `__PORT_XXXX__` placeholder of the running backend port so API calls get
// proxied to the sandbox server.
const API_BASE: string = (import.meta.env.VITE_API_BASE as string) || '';

/** Prefix an API path with the configured base URL. */
export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
