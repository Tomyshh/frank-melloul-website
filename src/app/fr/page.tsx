import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import BiographySection from "@/components/sections/BiographySection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Frank Melloul | Melloul & Partners — Conseil stratégique international",
  description:
    "Frank Melloul est le fondateur de Melloul & Partners, cabinet de conseil stratégique international. Influence, diplomatie et accompagnement des dirigeants.",
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
    },
  },
  openGraph: {
    title: "Frank Melloul | Melloul & Partners — Conseil stratégique international",
    description:
      "Frank Melloul dirige Melloul & Partners : conseil stratégique, influence et diplomatie pour les décideurs.",
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

