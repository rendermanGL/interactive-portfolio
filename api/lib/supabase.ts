import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import { env } from "./env";

// Node < 22 has no native WebSocket — provide one so the Supabase
// client's realtime module initialises (REST calls don't use it).
if (typeof globalThis.WebSocket === "undefined") {
  (globalThis as Record<string, unknown>).WebSocket = WebSocket;
}

let instance: SupabaseClient | undefined;

/**
 * Server-side Supabase client (singleton).
 * Uses the publishable key — all access is governed by the RLS
 * policies applied in the `rls_policies_and_stats_function` migration.
 */
export function getSupabase(): SupabaseClient {
  if (!instance) {
    instance = createClient(env.supabaseUrl, env.supabasePublishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return instance;
}
