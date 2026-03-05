import type { Metadata } from "next";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import CommunicationPageClient from "@/app/communication/CommunicationPageClient";

const DEFAULT_TITLE = "Communication | Melloul & Partners";
const DEFAULT_DESC =
  "Apparitions médiatiques, interviews et perspectives de Melloul & Partners.";

function thumbnailUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return undefined;
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
  let ogImage: string | undefined;
  let ogUrl = "/fr/communication";

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
      ogImage = thumbnailUrl(data.thumbnail_path);
      ogUrl = `/fr/communication?video=${videoId}`;
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
      ...(ogImage ? { images: [{ url: ogImage, width: 1280, height: 720 }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDesc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default function CommunicationFrPage() {
  return <CommunicationPageClient />;
}

