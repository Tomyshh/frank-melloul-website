import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

// Dynamic imports for client-side only components (reduces initial bundle)
const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Melloul & Partners | Global Advisory - Strategies for Influence and Diplomacy",
  description:
    "Global strategic advisory firm. We empower leaders to shape agendas, unlock opportunities, and create lasting impact.",
  keywords: [
    "strategic advisory",
    "diplomacy",
    "influence",
    "Frank Melloul",
    "Melloul & Partners",
    "consulting",
    "international affairs",
  ],
  authors: [{ name: "Frank Melloul" }],
  openGraph: {
    title: "Melloul & Partners | Global Advisory",
    description:
      "Global strategic advisory firm. Strategies for Influence and Diplomacy.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <LoadingScreen />
          <CustomCursor />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
        
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}

