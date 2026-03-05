import type { Metadata } from "next";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import CommunicationPageClient from "@/app/communication/CommunicationPageClient";

const SITE_URL = "https://melloulandpartners.com";
const DEFAULT_TITLE = "Communication | Melloul & Partners";
const DEFAULT_DESC =
  "Apparitions médiatiques, interviews et perspectives de Melloul & Partners.";
const FALLBACK_IMAGE = `${SITE_URL}/logo-gold.png`;

function thumbnailUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return FALLBACK_IMAGE;
  return `${base}/storage/v1/object/public/${SUPABASE_MEDIA_BUCKET}/${path}`;
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const videoId =
    typeof searchParams.video === "string" ? searchParams.video : undefined;

  let ogTitle = DEFAULT_TITLE;
  let ogDesc = DEFAULT_DESC;
  let ogImage = FALLBACK_IMAGE;
  let ogUrl = `${SITE_URL}/fr/communication`;

  if (videoId && supabase) {
    const { data } = await supabase
      .from("videos")
      .select("title,description,thumbnail_path")
      .eq("id", videoId)
      .eq("is_published", true)
      .single();

    if (data) {
      ogTitle = data.title + " | Melloul & Partners";
      ogDesc = data.description ?? DEFAULT_DESC;
      ogImage = data.thumbnail_path
        ? thumbnailUrl(data.thumbnail_path)
        : FALLBACK_IMAGE;
      ogUrl = `${SITE_URL}/fr/communication?video=${videoId}`;
    }
  }

  return {
    title: ogTitle,
    description: ogDesc,
    alternates: {
      canonical: "/fr/communication",
      languages: { en: "/communication", fr: "/fr/communication" },
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: ogUrl,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
  };
}

export default function CommunicationFrPage() {
  return <CommunicationPageClient />;
}
