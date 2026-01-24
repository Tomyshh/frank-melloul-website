import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import BiographySection from "@/components/sections/BiographySection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Melloul & Partners | Conseil stratégique international",
  description:
    "Cabinet de conseil stratégique international. Nous accompagnons les leaders pour façonner les agendas, débloquer les opportunités et créer un impact durable.",
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
  openGraph: {
    title: "Melloul & Partners | Conseil stratégique international",
    description:
      "Cabinet de conseil stratégique international. Stratégies d’influence et diplomatie.",
    url: "/fr",
    locale: "fr_FR",
    type: "website",
  },
};

export default function HomeFr() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <BiographySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

