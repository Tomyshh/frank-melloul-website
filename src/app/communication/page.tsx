import type { Metadata } from "next";
import { supabase, SUPABASE_MEDIA_BUCKET } from "@/lib/supabaseClient";
import CommunicationPageClient from "./CommunicationPageClient";

const DEFAULT_TITLE = "Communication | Melloul & Partners";
const DEFAULT_DESC =
  "Media appearances, interviews, and insights from Melloul & Partners.";

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
  let ogUrl = "/communication";

  if (videoId && supabase) {
    const { data } = await supabase
      .from("videos")
      .select("title,title_en,description,description_en,thumbnail_path")
      .eq("id", videoId)
      .eq("is_published", true)
      .single();

    if (data) {
      ogTitle = (data.title_en ?? data.title) + " | Melloul & Partners";
      ogDesc =
        data.description_en ?? data.description ?? DEFAULT_DESC;
      ogImage = thumbnailUrl(data.thumbnail_path);
      ogUrl = `/communication?video=${videoId}`;
    }
  }

  return {
    title: ogTitle,
    description: ogDesc,
    alternates: {
      canonical: "/communication",
      languages: { en: "/communication", fr: "/fr/communication" },
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: ogUrl,
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

export default function CommunicationPage() {
  return <CommunicationPageClient />;
}
