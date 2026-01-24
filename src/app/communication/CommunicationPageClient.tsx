"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for videos - will be replaced with database later
const mockVideos = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    title: "Strategic Advisory in the Modern Era",
    description:
      "Frank Melloul discusses the evolving landscape of global strategic advisory and its impact on international relations.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
    title: "Building Bridges: Diplomacy in Action",
    description:
      "An in-depth look at how effective diplomacy can unlock new market opportunities.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=450&fit=crop",
    title: "Leadership and Influence",
    description:
      "Insights on empowering leaders to shape agendas and create lasting impact.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop",
    title: "Market Access Strategies",
    description:
      "Exploring effective approaches for entering complex international markets.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

// Translations for this page
const pageTranslations = {
  en: {
    title: "Communication",
    subtitle:
      "Media appearances, interviews, and insights from Melloul & Partners",
    backToHome: "Back to Home",
    watchVideo: "Watch Video",
  },
  fr: {
    title: "Communication",
    subtitle:
      "Apparitions médiatiques, interviews et perspectives de Melloul & Partners",
    backToHome: "Retour à l'accueil",
    watchVideo: "Regarder la vidéo",
  },
} as const;

export default function CommunicationPageClient() {
  const { locale } = useLanguage();
  const t = pageTranslations[locale];

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
            {mockVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                watchText={t.watchVideo}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  videoUrl: string;
}

function VideoCard({
  video,
  index,
  watchText,
}: {
  video: Video;
  index: number;
  watchText: string;
}) {
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video mb-6 overflow-hidden rounded-lg bg-navy-800">
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
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-serif text-primary-100 group-hover:text-gold-400 transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-primary-400 leading-relaxed">{video.description}</p>
        <motion.button
          className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium tracking-wider uppercase mt-2"
          whileHover={{ x: 5 }}
        >
          {watchText}
          <span>→</span>
        </motion.button>
      </div>
    </motion.article>
  );
}

