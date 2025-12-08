import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import PreloadResources from "@/components/PreloadResources";

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
  metadataBase: new URL("https://frank-melloul-website.onrender.com"),
  icons: {
    icon: [
      { url: "/only_gold_logo.png", sizes: "32x32", type: "image/png" },
      { url: "/only_gold_logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/only_gold_logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/only_gold_logo.png",
  },
  openGraph: {
    title: "Melloul & Partners | Global Advisory",
    description:
      "Global strategic advisory firm. Strategies for Influence and Diplomacy.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo-gold.png",
        width: 1200,
        height: 630,
        alt: "Melloul & Partners Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melloul & Partners | Global Advisory",
    description: "Global strategic advisory firm. Strategies for Influence and Diplomacy.",
    images: ["/logo-gold.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Inline script for immediate preload - executes before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!document.querySelector('link[rel="preload"][href="/logo-gold.png"]')) {
                  const link1 = document.createElement('link');
                  link1.rel = 'preload';
                  link1.href = '/logo-gold.png';
                  link1.as = 'image';
                  link1.type = 'image/png';
                  link1.setAttribute('fetchpriority', 'high');
                  document.head.appendChild(link1);
                }
                if (!document.querySelector('link[rel="preload"][href="/logo-blue.png"]')) {
                  const link2 = document.createElement('link');
                  link2.rel = 'preload';
                  link2.href = '/logo-blue.png';
                  link2.as = 'image';
                  link2.type = 'image/png';
                  link2.setAttribute('fetchpriority', 'high');
                  document.head.appendChild(link2);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <PreloadResources />
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

