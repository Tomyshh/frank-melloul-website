"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";

type VideoRow = {
  id: string;
  title: string;
  description: string | null;
  title_en?: string | null;
  description_en?: string | null;
  video_path: string;
  thumbnail_path: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function sanitizeFilename(name: string) {
  return name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

function getPublicUrl(client: NonNullable<typeof supabase>, path: string) {
  const { data } = client.storage.from(SUPABASE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function AdminPage() {
  const client = supabase;
  const supabaseReady = Boolean(client);
  const [session, setSession] = useState<Awaited<
    ReturnType<NonNullable<typeof supabase>["auth"]["getSession"]>
  >["data"]["session"]>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!supabaseReady) {
      toast.error(
        "Supabase n'est pas configuré. Vérifie les variables d'environnement sur Render."
      );
      setLoadingSession(false);
      return () => {
        mounted = false;
      };
    }

    client!.auth
      .getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) toast.error(error.message);
        setSession(data.session ?? null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingSession(false);
      });

    const { data: sub } = client!.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabaseReady]);

  if (loadingSession) {
    return (
      <main className="min-h-screen bg-navy-950 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-primary-300 text-sm">Chargement…</div>
        </div>
      </main>
    );
  }

  if (!supabaseReady) {
    return (
      <main className="min-h-screen bg-navy-950 pt-28 pb-20">
        <div className="fixed inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-100">
            <div className="font-medium mb-1">Configuration manquante</div>
            <div className="text-sm text-red-100/80">
              Les variables <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              et <code className="font-mono">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY</code>{" "}
              doivent être définies dans Render (au build et au runtime).
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy-950 pt-28 pb-20">
      <div className="fixed inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-6 h-[1px] bg-gold-400" />
              <h1 className="text-3xl md:text-4xl font-serif text-primary-100">
                Admin · Vidéos
              </h1>
            </div>
            <p className="text-primary-400 text-sm max-w-2xl">
              Connexion Supabase Auth requise. Ici tu peux ajouter, éditer et
              publier les vidéos (vidéo + thumbnail) stockées dans Supabase
              Storage.
            </p>
          </div>

          <Link
            href="/"
            className="text-primary-300 hover:text-gold-500 text-sm transition-colors"
          >
            ← Retour au site
          </Link>
        </div>

        {!session ? <LoginPanel /> : <VideosDashboard />}
      </div>
    </main>
  );
}

function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (error) {
      toast.error(`Connexion impossible: ${error.message}`);
      return;
    }
    toast.success("Connecté.");
  };

  return (
    <section className="max-w-md">
      <div className="rounded-2xl border border-gold-500/10 bg-navy-950/60 backdrop-blur p-6">
        <h2 className="text-primary-100 font-medium mb-4">Connexion</h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Mot de passe
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gold-500 text-navy-950 font-medium py-2.5 hover:bg-gold-400 transition-colors disabled:opacity-60"
          >
            {submitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </section>
  );
}

function VideosDashboard() {
  const client = supabase!;
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VideoRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [previewing, setPreviewing] = useState<VideoRow | null>(null);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await client
      .from("videos")
      .select("*")
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false });

    setLoading(false);
    if (error) {
      toast.error(`Chargement impossible: ${error.message}`);
      return;
    }
    setVideos((data ?? []) as VideoRow[]);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      toast.error(`Déconnexion impossible: ${error.message}`);
      return;
    }
    toast.success("Déconnecté.");
  };

  const onTogglePublished = async (row: VideoRow) => {
    const { error } = await client
      .from("videos")
      .update({ is_published: !row.is_published })
      .eq("id", row.id);
    if (error) {
      toast.error(`Échec: ${error.message}`);
      return;
    }
    toast.success(row.is_published ? "Dépublié." : "Publié.");
    refresh();
  };

  const onDelete = async (row: VideoRow) => {
    const ok = window.confirm(
      `Supprimer définitivement "${row.title}" (DB + fichiers Storage) ?`
    );
    if (!ok) return;

    const { error: dbError } = await client.from("videos").delete().eq("id", row.id);
    if (dbError) {
      toast.error(`Suppression DB impossible: ${dbError.message}`);
      return;
    }

    const paths = [row.video_path, row.thumbnail_path].filter(Boolean);
    if (paths.length) {
      const { error: storageError } = await client
        .storage
        .from(SUPABASE_MEDIA_BUCKET)
        .remove(paths);
      if (storageError) {
        toast.error(`DB supprimée, mais fichiers non supprimés: ${storageError.message}`);
        refresh();
        return;
      }
    }

    toast.success("Supprimé.");
    refresh();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-primary-500">
          Bucket: <span className="text-primary-300">{SUPABASE_MEDIA_BUCKET}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-lg border border-gold-500/20 bg-gold-500/10 text-gold-300 px-3 py-2 text-sm hover:bg-gold-500/15 transition-colors"
          >
            + Ajouter une vidéo
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-gold-500/10 bg-navy-950/30 text-primary-300 px-3 py-2 text-sm hover:border-gold-500/25 hover:text-gold-200 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <VideoForm
          mode={creating ? "create" : "edit"}
          initial={editing ?? undefined}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            refresh();
          }}
        />
      )}

      {previewing ? (
        <AdminVideoModal
          title={previewing.title}
          description={previewing.description ?? ""}
          videoUrl={getPublicUrl(client, previewing.video_path)}
          posterUrl={getPublicUrl(client, previewing.thumbnail_path)}
          onClose={() => setPreviewing(null)}
        />
      ) : null}

      <div className="rounded-2xl border border-gold-500/10 bg-navy-950/60 backdrop-blur">
        <div className="p-5 border-b border-gold-500/10 flex items-center justify-between">
          <h2 className="text-primary-100 font-medium">Vidéos</h2>
          <button
            type="button"
            onClick={refresh}
            className="text-xs text-primary-400 hover:text-gold-300 transition-colors"
          >
            Rafraîchir
          </button>
        </div>

        {loading ? (
          <div className="p-5 text-sm text-primary-300">Chargement…</div>
        ) : videos.length === 0 ? (
          <div className="p-5 text-sm text-primary-300">
            Aucune vidéo pour le moment.
          </div>
        ) : (
          <ul className="divide-y divide-gold-500/10">
            {videos.map((v) => (
              <li key={v.id} className="p-5 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-56">
                  <button
                    type="button"
                    onClick={() => setPreviewing(v)}
                    className="w-full aspect-video rounded-lg overflow-hidden bg-navy-900/50 border border-gold-500/10 relative group"
                    aria-label={`Voir: ${v.title}`}
                  >
                    <img
                      src={getPublicUrl(client, v.thumbnail_path)}
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-navy-950 ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-primary-100 font-medium truncate">
                          {v.title}
                        </h3>
                        <span
                          className={[
                            "text-[11px] px-2 py-0.5 rounded-full border",
                            v.is_published
                              ? "border-emerald-500/20 text-emerald-300 bg-emerald-500/10"
                              : "border-amber-500/20 text-amber-300 bg-amber-500/10",
                          ].join(" ")}
                        >
                          {v.is_published ? "Publié" : "Brouillon"}
                        </span>
                      </div>
                      {v.description ? (
                        <p className="text-primary-400 text-sm mt-2 line-clamp-2">
                          {v.description}
                        </p>
                      ) : null}
                      <p className="text-primary-600 text-xs mt-2">
                        Ordre: {v.sort_order}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewing(v)}
                        className="rounded-lg border border-gold-500/15 bg-navy-950/30 text-primary-200 px-3 py-2 text-sm hover:border-gold-500/30 hover:text-gold-200 transition-colors"
                      >
                        Voir
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(v)}
                        className="rounded-lg border border-gold-500/15 bg-navy-950/30 text-primary-200 px-3 py-2 text-sm hover:border-gold-500/30 hover:text-gold-200 transition-colors"
                      >
                        Éditer
                      </button>
                      <button
                        type="button"
                        onClick={() => onTogglePublished(v)}
                        className="rounded-lg border border-gold-500/15 bg-navy-950/30 text-primary-200 px-3 py-2 text-sm hover:border-gold-500/30 hover:text-gold-200 transition-colors"
                      >
                        {v.is_published ? "Dépublier" : "Publier"}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(v)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 text-red-200 px-3 py-2 text-sm hover:bg-red-500/15 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function AdminVideoModal({
  title,
  description,
  videoUrl,
  posterUrl,
  onClose,
}: {
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gold-500/10 bg-navy-950/95">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gold-500/10">
          <div className="min-w-0">
            <div className="text-primary-100 font-medium truncate">{title}</div>
            {description ? (
              <div className="text-primary-400 text-sm truncate">{description}</div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-primary-400 hover:text-gold-300 transition-colors"
          >
            Fermer
          </button>
        </div>

        <div className="bg-black relative aspect-video">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex w-10 h-10 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
            </div>
          ) : null}
          <video
            src={videoUrl}
            controls
            playsInline
            className="w-full h-full object-contain"
            poster={posterUrl}
            preload="metadata"
            onLoadStart={() => setIsLoading(true)}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onCanPlayThrough={() => setIsLoading(false)}
            onLoadedData={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

function VideoForm({
  mode,
  initial,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  initial?: VideoRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const client = supabase!;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [titleEn, setTitleEn] = useState(initial?.title_en ?? "");
  const [descriptionEn, setDescriptionEn] = useState(initial?.description_en ?? "");
  const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);
  const [sortOrder, setSortOrder] = useState<number>(initial?.sort_order ?? 0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingStep, setSavingStep] = useState<
    "idle" | "thumbnail" | "video" | "db"
  >("idle");

  const isCreate = mode === "create";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate && (!videoFile || !thumbFile)) {
      toast.error("Vidéo et photo sont requis pour créer.");
      return;
    }

    setSaving(true);
    setSavingStep("thumbnail");

    const id = initial?.id ?? crypto.randomUUID();
    const nowPrefix = `${Date.now()}`;

    let nextVideoPath = initial?.video_path ?? "";
    let nextThumbPath = initial?.thumbnail_path ?? "";

    const uploadFile = async (folder: "videos" | "thumbnails", file: File) => {
      const ext = sanitizeFilename(file.name);
      const path = `${folder}/${id}/${nowPrefix}-${ext}`;
      const { error } = await client.storage.from(SUPABASE_MEDIA_BUCKET).upload(path, file, {
        // Les chemins sont versionnés (timestamp) -> cache long OK
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (error) throw error;
      return path;
    };

    try {
      if (thumbFile) {
        setSavingStep("thumbnail");
        const uploadedThumbPath = await uploadFile("thumbnails", thumbFile);
        if (initial?.thumbnail_path) {
          await client.storage
            .from(SUPABASE_MEDIA_BUCKET)
            .remove([initial.thumbnail_path]);
        }
        nextThumbPath = uploadedThumbPath;
      }

      if (videoFile) {
        setSavingStep("video");
        const uploadedVideoPath = await uploadFile("videos", videoFile);
        if (initial?.video_path) {
          await client.storage.from(SUPABASE_MEDIA_BUCKET).remove([initial.video_path]);
        }
        nextVideoPath = uploadedVideoPath;
      }

      const payload = {
        title,
        description: description || null,
        title_en: titleEn || null,
        description_en: descriptionEn || null,
        video_path: nextVideoPath,
        thumbnail_path: nextThumbPath,
        is_published: isPublished,
        sort_order: sortOrder,
      };
      if (isCreate) {
        setSavingStep("db");
        const { error } = await client.from("videos").insert({ id, ...payload });
        if (error) throw error;
        toast.success("Vidéo ajoutée.");
      } else {
        setSavingStep("db");
        const { error } = await client
          .from("videos")
          .update(payload)
          .eq("id", id);
        if (error) throw error;
        toast.success("Vidéo mise à jour.");
      }

      onSaved();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur inconnue pendant l'opération.";
      toast.error(message);
    } finally {
      setSaving(false);
      setSavingStep("idle");
    }
  };

  return (
    <div className="relative rounded-2xl border border-gold-500/10 bg-navy-950/60 backdrop-blur p-6 overflow-hidden">
      {saving ? (
        <div className="absolute inset-0 z-10 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center">
          <div className="rounded-2xl border border-gold-500/15 bg-navy-950/80 px-5 py-4 flex items-center gap-3">
            <span className="inline-flex w-5 h-5 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
            <div className="min-w-0">
              <div className="text-primary-100 text-sm font-medium">
                Upload en cours…
              </div>
              <div className="text-primary-400 text-xs">
                {savingStep === "thumbnail"
                  ? "Envoi de la photo"
                  : savingStep === "video"
                    ? "Envoi de la vidéo (peut prendre du temps)"
                    : "Enregistrement en base"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-primary-100 font-medium">
            {isCreate ? "Ajouter une vidéo" : "Éditer la vidéo"}
          </h3>
          <p className="text-primary-500 text-xs mt-1">
            {isCreate
              ? "Upload: photo + vidéo, puis création en base."
              : "Tu peux modifier les infos et remplacer les fichiers."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-primary-400 hover:text-gold-300 transition-colors text-sm"
        >
          Fermer
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        {/* Section Français */}
        <div className="md:col-span-2 space-y-3 pt-2 border-b border-gold-500/10 pb-4">
          <div className="text-xs tracking-wider text-gold-400 uppercase font-medium">
            Français
          </div>
          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Titre (FR)
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="Titre de la vidéo"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Description (FR)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[80px] rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="Description (optionnel)"
            />
          </div>
        </div>

        {/* Section English */}
        <div className="md:col-span-2 space-y-3 pt-2 border-b border-gold-500/10 pb-4">
          <div className="text-xs tracking-wider text-gold-400 uppercase font-medium">
            English
          </div>
          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Title (EN)
            </label>
            <input
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="Video title"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs tracking-wider text-primary-400 uppercase">
              Description (EN)
            </label>
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              className="w-full min-h-[80px] rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
              placeholder="Description (optional)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs tracking-wider text-primary-400 uppercase">
            Ordre d’affichage
          </label>
          <input
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            type="number"
            className="w-full rounded-lg bg-navy-900/50 border border-gold-500/10 focus:border-gold-500/40 outline-none px-3 py-2 text-primary-100"
          />
        </div>

        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-primary-200">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="accent-gold-400"
            />
            Publié
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-xs tracking-wider text-primary-400 uppercase">
            Photo {isCreate ? "(requis)" : "(optionnel)"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
            className="w-full text-primary-200 text-sm file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gold-500/10 file:text-gold-200 hover:file:bg-gold-500/15"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs tracking-wider text-primary-400 uppercase">
            Vidéo {isCreate ? "(requis)" : "(optionnel)"}
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="w-full text-primary-200 text-sm file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gold-500/10 file:text-gold-200 hover:file:bg-gold-500/15"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-gold-500/10 bg-navy-950/30 text-primary-300 px-4 py-2 text-sm hover:border-gold-500/25 hover:text-gold-200 transition-colors disabled:opacity-60"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gold-500 text-navy-950 font-medium px-4 py-2 text-sm hover:bg-gold-400 transition-colors disabled:opacity-60"
          >
            {saving ? "Téléversement…" : isCreate ? "Ajouter" : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}

