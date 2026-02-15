-- Exécuter dans Supabase SQL Editor
-- Objectif: permettre la gestion d'articles (titre, contenu, image) depuis l'admin.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  title_en TEXT,
  content_en TEXT,
  image_path TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_published_sort_created
  ON public.articles (is_published, sort_order DESC, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_articles_set_updated_at ON public.articles;
CREATE TRIGGER trg_articles_set_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Lecture publique seulement des articles publiés
DROP POLICY IF EXISTS "articles_select_published" ON public.articles;
CREATE POLICY "articles_select_published"
ON public.articles
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Gestion complète pour les utilisateurs authentifiés (admin dashboard)
DROP POLICY IF EXISTS "articles_insert_authenticated" ON public.articles;
CREATE POLICY "articles_insert_authenticated"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "articles_update_authenticated" ON public.articles;
CREATE POLICY "articles_update_authenticated"
ON public.articles
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "articles_delete_authenticated" ON public.articles;
CREATE POLICY "articles_delete_authenticated"
ON public.articles
FOR DELETE
TO authenticated
USING (true);

-- Optionnel mais recommandé: autoriser l'upload d'images d'articles dans le bucket "media".
-- Nécessite que le bucket "media" existe déjà.
DROP POLICY IF EXISTS "media_articles_read_public" ON storage.objects;
CREATE POLICY "media_articles_read_public"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'media'
  AND name LIKE 'articles/%'
);

DROP POLICY IF EXISTS "media_articles_write_authenticated" ON storage.objects;
CREATE POLICY "media_articles_write_authenticated"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND name LIKE 'articles/%'
);

DROP POLICY IF EXISTS "media_articles_update_authenticated" ON storage.objects;
CREATE POLICY "media_articles_update_authenticated"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media'
  AND name LIKE 'articles/%'
)
WITH CHECK (
  bucket_id = 'media'
  AND name LIKE 'articles/%'
);

DROP POLICY IF EXISTS "media_articles_delete_authenticated" ON storage.objects;
CREATE POLICY "media_articles_delete_authenticated"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'media'
  AND name LIKE 'articles/%'
);
