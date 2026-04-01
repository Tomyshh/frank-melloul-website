"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";

interface ArticleData {
  id: string;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
}

function getPublicUrl(path: string) {
  return (
    supabase?.storage.from(SUPABASE_MEDIA_BUCKET).getPublicUrl(path).data
      .publicUrl ?? ""
  );
}

function formatDate(iso: string, locale: "fr" | "en") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default function ArticlePageClient({
  id,
  locale,
}: {
  id: string;
  locale: "fr" | "en";
}) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const backHref = locale === "fr" ? "/fr/communication" : "/communication";
  const backLabel = locale === "fr" ? "← Retour à Communication" : "← Back to Communication";
  const loadingLabel = locale === "fr" ? "Chargement…" : "Loading…";
  const notFoundLabel =
    locale === "fr" ? "Article introuvable." : "Article not found.";
  const byLabel = locale === "fr" ? "Par" : "By";
  const roleLabel =
    locale === "fr"
      ? "Fondateur & Associé, Melloul & Partners"
      : "Founder & Partner, Melloul & Partners";

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    supabase
      .from("articles")
      .select("id,title,content,title_en,content_en,image_path,created_at")
      .eq("id", id)
      .eq("is_published", true)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error || !data) {
          setNotFound(true);
          return;
        }
        const d = data as {
          id: string;
          title: string;
          content: string;
          title_en: string | null;
          content_en: string | null;
          image_path: string;
          created_at: string;
        };
        setArticle({
          id: d.id,
          title: locale === "en" ? (d.title_en ?? d.title) : d.title,
          content: locale === "en" ? (d.content_en ?? d.content) : d.content,
          image_path: d.image_path,
          created_at: d.created_at,
        });
      });
  }, [id, locale]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy-950 pb-24">

        {loading ? (
          <div className="relative z-10 pt-40 container mx-auto px-6 md:px-12 lg:px-20">
            <p className="text-primary-400 text-sm">{loadingLabel}</p>
          </div>
        ) : notFound ? (
          <div className="relative z-10 pt-40 container mx-auto px-6 md:px-12 lg:px-20">
            <p className="text-primary-400 text-sm">{notFoundLabel}</p>
            <Link
              href={backHref}
              className="mt-4 inline-block text-gold-500 hover:text-gold-400 text-sm transition-colors"
            >
              {backLabel}
            </Link>
          </div>
        ) : article ? (
          <>
            {/* Hero image — tall but not full screen, starts from top under transparent header */}
            <div className="relative w-full h-[60vh] overflow-hidden">
              <img
                src={getPublicUrl(article.image_path)}
                alt={article.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Very subtle top fade so header text remains readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-navy-950" />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="-mt-6 mb-8"
              >
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-gold-500 text-sm transition-colors"
                >
                  <span>←</span>
                  <span>{backLabel.replace("← ", "")}</span>
                </Link>
              </motion.div>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Date */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-5 h-[1px] bg-gold-400" />
                  <time className="text-primary-500 text-xs tracking-wider uppercase">
                    {formatDate(article.created_at, locale)}
                  </time>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-100 leading-tight mb-8">
                  {article.title}
                </h1>

                {/* Gold divider */}
                <div className="w-12 h-[2px] bg-gold-500 mb-10" />

                {/* Body content */}
                <div className="prose-article text-primary-300 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-6">
                  {article.content.split(/\n{2,}/).map((paragraph, i) => (
                    <p key={i} className="text-primary-300 leading-[1.85]">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                {/* Author signature */}
                <footer className="mt-16 pt-8 border-t border-gold-500/20">
                  <div className="flex items-center gap-4">
                    <img
                      src="/avatar_to_circle.png"
                      alt="Frank Melloul"
                      className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-gold-500/30"
                    />
                    <div>
                      <p className="text-xs text-primary-500 uppercase tracking-widest mb-0.5">
                        {byLabel}
                      </p>
                      <p className="text-primary-100 font-serif text-lg leading-tight">
                        Frank Melloul
                      </p>
                      <p className="text-primary-500 text-sm mt-0.5">
                        {roleLabel}
                      </p>
                    </div>
                  </div>
                </footer>
              </motion.article>
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
