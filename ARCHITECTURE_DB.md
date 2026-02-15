# Architecture DB Supabase (site)

## Tables applicatives

### `videos`
Utilisée par la page `communication` et l'admin.

- `id` (uuid, PK)
- `title` (text, requis)
- `description` (text, optionnel)
- `title_en` (text, optionnel)
- `description_en` (text, optionnel)
- `video_path` (text, requis, chemin Storage)
- `thumbnail_path` (text, requis, chemin Storage)
- `is_published` (boolean)
- `sort_order` (integer)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### `articles`
Ajoutée pour gérer des posts avec image depuis l'admin.

- `id` (uuid, PK)
- `title` (text, requis)
- `content` (text, requis)
- `title_en` (text, optionnel)
- `content_en` (text, optionnel)
- `image_path` (text, requis, chemin Storage)
- `is_published` (boolean)
- `sort_order` (integer)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## Storage

- Bucket média: `media`
- Vidéos: préfixes `videos/` et `thumbnails/`
- Articles: préfixe `articles/`
