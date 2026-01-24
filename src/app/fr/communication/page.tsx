import type { Metadata } from "next";
import CommunicationPageClient from "@/app/communication/CommunicationPageClient";

export const metadata: Metadata = {
  title: "Communication | Melloul & Partners",
  description:
    "Apparitions médiatiques, interviews et perspectives de Melloul & Partners.",
  alternates: {
    canonical: "/fr/communication",
    languages: {
      en: "/communication",
      fr: "/fr/communication",
    },
  },
  openGraph: {
    title: "Communication | Melloul & Partners",
    description:
      "Apparitions médiatiques, interviews et perspectives de Melloul & Partners.",
    url: "/fr/communication",
    locale: "fr_FR",
    type: "website",
  },
};

export default function CommunicationFrPage() {
  return <CommunicationPageClient />;
}

