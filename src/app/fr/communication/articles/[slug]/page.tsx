import type { Metadata } from "next";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import ArticlePageClient from "@/app/communication/articles/[slug]/ArticlePageClient";

const SITE_URL = "https://melloulandpartners.com";
const FALLBACK_IMAGE = `${SITE_URL}/logo-gold.png`;

function imageUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return FALLBACK_IMAGE;
  return `${base}/storage/v1/object/public/${SUPABASE_MEDIA_BUCKET}/${path}`;
}

type Props = { params: { slug: string } };

async function getArticle(slug: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("articles")
    .select("slug,title,title_en,content,content_en,image_path,created_at,updated_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticle(params.slug);
  if (!data) return { title: "Article | Melloul & Partners" };

  const title = data.title + " | Melloul & Partners";
  const description = (data.content ?? "").slice(0, 160);
  const ogImage = data.image_path ? imageUrl(data.image_path) : FALLBACK_IMAGE;
  const url = `${SITE_URL}/fr/communication/articles/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/fr/communication/articles/${params.slug}`,
      languages: {
        en: `/communication/articles/${params.slug}`,
        fr: `/fr/communication/articles/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: "fr_FR",
      type: "article",
      publishedTime: data.created_at,
      modifiedTime: data.updated_at,
      authors: ["Frank Melloul"],
      section: "Communication",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function ArticleFrPage({ params }: Props) {
  const data = await getArticle(params.slug);

  const ogImage = data?.image_path ? imageUrl(data.image_path) : FALLBACK_IMAGE;
  const articleTitle = data?.title ?? "";
  const articleDesc = data ? (data.content ?? "").slice(0, 300) : "";

  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleTitle,
        description: articleDesc,
        image: ogImage,
        datePublished: data.created_at,
        dateModified: data.updated_at,
        inLanguage: "fr",
        url: `${SITE_URL}/fr/communication/articles/${params.slug}`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/fr/communication/articles/${params.slug}`,
        },
        author: {
          "@type": "Person",
          name: "Frank Melloul",
          url: `${SITE_URL}/`,
          jobTitle: "Fondateur",
          worksFor: {
            "@type": "Organization",
            name: "Melloul & Partners",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "Melloul & Partners",
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/only_gold_logo.png`,
          },
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticlePageClient slug={params.slug} locale="fr" />
    </>
  );
}
