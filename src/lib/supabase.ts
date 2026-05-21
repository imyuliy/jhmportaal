// Supabase client skeleton.
// Vul VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY in een .env.local in zodra Lovable Supabase koppelt.
// Voor nu wordt de client lui geïnitialiseerd; pages gebruiken `mockData` totdat env vars aanwezig zijn.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  if (!url || !key) {
    if (typeof window !== "undefined") {
      // Eenmalige hint in console — niet blokkerend.
      // eslint-disable-next-line no-console
      console.info(
        "[JHM Flow] Supabase env vars ontbreken — app draait op mock data. Zet VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY in .env.local."
      );
    }
    return null;
  }
  _client = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}

export const isSupabaseConfigured = () => Boolean(url && key);
