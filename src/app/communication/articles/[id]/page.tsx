import type { Metadata } from "next";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import ArticlePageClient from "./ArticlePageClient";

const SITE_URL = "https://melloulandpartners.com";
const FALLBACK_IMAGE = `${SITE_URL}/logo-gold.png`;

function imageUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return FALLBACK_IMAGE;
  return `${base}/storage/v1/object/public/${SUPABASE_MEDIA_BUCKET}/${path}`;
}

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!supabase) return { title: "Article | Melloul & Partners" };

  const { data } = await supabase
    .from("articles")
    .select("title,title_en,content,content_en,image_path")
    .eq("id", params.id)
    .eq("is_published", true)
    .single();

  if (!data) return { title: "Article | Melloul & Partners" };

  const title = (data.title_en ?? data.title) + " | Melloul & Partners";
  const description = ((data.content_en ?? data.content) ?? "").slice(0, 160);
  const ogImage = data.image_path ? imageUrl(data.image_path) : FALLBACK_IMAGE;
  const url = `${SITE_URL}/communication/articles/${params.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/communication/articles/${params.id}`,
      languages: {
        en: `/communication/articles/${params.id}`,
        fr: `/fr/communication/articles/${params.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default function ArticlePage({ params }: Props) {
  return <ArticlePageClient id={params.id} locale="en" />;
}
