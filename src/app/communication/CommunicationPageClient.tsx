"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import { toast } from "sonner";

// Translations for this page
const pageTranslations = {
  en: {
    title: "Communication",
    subtitle:
      "Media appearances, interviews, and insights from Melloul & Partners",
    backToHome: "Back to Home",
    watchVideo: "Watch Video",
    loading: "Loading…",
    empty: "No videos available yet.",
  },
  fr: {
    title: "Communication",
    subtitle:
      "Apparitions médiatiques, interviews et perspectives de Melloul & Partners",
    backToHome: "Retour à l'accueil",
    watchVideo: "Regarder la vidéo",
    loading: "Chargement…",
    empty: "Aucune vidéo disponible pour le moment.",
  },
} as const;

export default function CommunicationPageClient() {
  const { locale } = useLanguage();
  const t = pageTranslations[locale];
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Video | null>(null);
  const client = supabase;
  const supabaseReady = Boolean(client);

  const bucket = SUPABASE_MEDIA_BUCKET;
  const getPublicUrl = useMemo(
    () => (path: string) =>
      client?.storage.from(bucket).getPublicUrl(path).data.publicUrl ?? "",
    [bucket, client]
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!supabaseReady) {
        setLoading(false);
        toast.error(
          "Supabase n'est pas configuré. Vérifie les variables d'environnement du déploiement."
        );
        return;
      }

      setLoading(true);
      const { data, error } = await client!
        .from("videos")
        .select("id,title,description,video_path,thumbnail_path,is_published,sort_order,created_at")
        .eq("is_published", true)
        .order("sort_order", { ascending: false })
        .order("created_at", { ascending: false });

      if (!mounted) return;
      setLoading(false);

      if (error) {
        toast.error(`Impossible de charger les vidéos: ${error.message}`);
        setVideos([]);
        return;
      }

      const mapped =
        (data ?? []).map((row: any) => ({
          id: row.id as string,
          thumbnail: getPublicUrl(row.thumbnail_path as string),
          title: row.title as string,
          description: (row.description as string | null) ?? "",
          videoUrl: getPublicUrl(row.video_path as string),
        })) ?? [];

      setVideos(mapped);
    })();

    return () => {
      mounted = false;
    };
  }, [getPublicUrl, supabaseReady]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy-950 pt-32 pb-20">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-gold-500 transition-colors"
            >
              <span>←</span>
              <span>{t.backToHome}</span>
            </Link>
          </motion.div>

          {/* Page title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-6 h-[1px] bg-gold-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-100">
                {t.title}
              </h1>
            </div>
            <p className="text-primary-400 text-lg md:text-xl max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Video grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {loading ? (
              <div className="text-primary-300 text-sm">{t.loading}</div>
            ) : videos.length === 0 ? (
              <div className="text-primary-300 text-sm">{t.empty}</div>
            ) : (
              videos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  watchText={t.watchVideo}
                  onOpen={() => setActive(video)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {active ? (
        <VideoModal
          video={active}
          onClose={() => setActive(null)}
        />
      ) : null}
      <Footer />
    </>
  );
}

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  videoUrl: string;
}

function VideoCard({
  video,
  index,
  watchText,
  onOpen,
}: {
  video: Video;
  index: number;
  watchText: string;
  onOpen: () => void;
}) {
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={onOpen}
        className="relative aspect-video mb-6 overflow-hidden rounded-lg bg-navy-800 w-full text-left"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-navy-950 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent pointer-events-none" />
      </button>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-serif text-primary-100 group-hover:text-gold-400 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-primary-400 leading-relaxed">{video.description}</p>
        <motion.button
          className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium tracking-wider uppercase mt-2"
          whileHover={{ x: 5 }}
          onClick={onOpen}
        >
          {watchText}
          <span>→</span>
        </motion.button>
      </div>
    </motion.article>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
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
            <div className="text-primary-100 font-medium truncate">{video.title}</div>
            {video.description ? (
              <div className="text-primary-400 text-sm truncate">{video.description}</div>
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

        {/* Cadre fixe 16:9 pour éviter que le poster change de taille au chargement */}
        <div className="bg-black relative aspect-video">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex w-10 h-10 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
            </div>
          ) : null}
          <video
            src={video.videoUrl}
            controls
            playsInline
            className="w-full h-full object-contain"
            poster={video.thumbnail}
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

