import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

// Supabase connection used by the server-side API handlers.
// Prefer a valid service role key (bypasses RLS) when one is provided via env.
// Otherwise fall back to the anon/publishable key — it is safe to expose and
// works under the project's RLS policies, so the app keeps functioning even
// before a valid service role key is configured.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://ddmgabswnicvtiucgtcm.supabase.co';

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_eookD0wLxcO-xLhb7dqAfg_8fmGexWy';

const key = serviceRoleKey || anonKey;

const supabase = createClient(supabaseUrl, key, {
  global: {
    fetch: async (url, options) => {
      const res = await fetch(url, options);
      if (!res.ok && res.status >= 500) triggerRestore();
      return res;
    },
  },
});

export default supabase;
