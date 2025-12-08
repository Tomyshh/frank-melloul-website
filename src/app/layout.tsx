import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { LanguageProvider } from "@/context/LanguageContext";

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

