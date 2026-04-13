import { supabase } from "./supabaseClient";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUUID(value: string): boolean {
  return UUID_RE.test(value);
}

/**
 * Fetches a single published article by slug or UUID.
 * If the identifier looks like a UUID, queries by `id`.
 * Otherwise queries by `slug`.
 */
export async function fetchArticle(
  identifier: string,
  columns: string
): Promise<Record<string, unknown> | null> {
  if (!supabase) return null;

  if (isUUID(identifier)) {
    const { data } = await supabase
      .from("articles")
      .select(columns)
      .eq("id", identifier)
      .eq("is_published", true)
      .single();
    return data as Record<string, unknown> | null;
  }

  const { data, error } = await supabase
    .from("articles")
    .select(columns)
    .eq("slug", identifier)
    .eq("is_published", true)
    .single();

  if (error && error.code === "PGRST204") return null;
  return data as Record<string, unknown> | null;
}

/**
 * Fetches related articles (published, excluding current).
 * Works with both slug and UUID identifiers.
 */
export async function fetchRelatedArticles(
  currentIdentifier: string,
  columns: string,
  limit = 4
): Promise<Record<string, unknown>[]> {
  if (!supabase) return [];

  const filterCol = isUUID(currentIdentifier) ? "id" : "slug";

  const { data } = await supabase
    .from("articles")
    .select(columns)
    .eq("is_published", true)
    .neq(filterCol, currentIdentifier)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as Record<string, unknown>[] | null) ?? [];
}
