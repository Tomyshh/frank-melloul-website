import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Supabase env manquantes. Vérifie NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY dans .env"
  );
}

// IMPORTANT: ne pas appeler createClient() si les env ne sont pas définies.
// Sinon, en build/prerender (Render/CI) ça peut faire échouer le déploiement.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? (createClient(supabaseUrl, supabaseAnonKey) as SupabaseClient)
    : null;

export const SUPABASE_MEDIA_BUCKET = "media";

