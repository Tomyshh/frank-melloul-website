-- Exécuter dans l’éditeur SQL Supabase pour activer l’i18n sur les vidéos.
-- Ajoute les colonnes titre/description en anglais (FR = title, description existants).

ALTER TABLE videos
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;
