import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import PreloadResources from "@/components/PreloadResources";
import { Toaster } from "sonner";

// Dynamic imports for client-side only components (reduces initial bundle)
const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);


const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: {
    default:
      "Frank Melloul | Melloul & Partners — Global Advisory & Strategic Influence",
    template: "%s | Frank Melloul — Melloul & Partners",
  },
  description:
    "Frank Melloul is the founder of Melloul & Partners, a global strategic advisory firm. Strategies for influence, diplomacy, and executive counsel for leaders worldwide.",
  keywords: [
    "Frank Melloul",
    "Frank Melloul advisor",
    "Melloul & Partners",
    "strategic advisory",
    "diplomacy",
    "influence",
    "consulting",
    "international affairs",
  ],
  authors: [{ name: "Frank Melloul" }],
  metadataBase: new URL("https://melloulandpartners.com"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    title: "Frank Melloul | Melloul & Partners — Global Advisory",
    description:
      "Frank Melloul leads Melloul & Partners: global strategic advisory, influence, and diplomacy for decision-makers.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Melloul & Partners",
    images: [
      {
        url: "/only_gold_logo.png",
        width: 1200,
        height: 630,
        alt: "Melloul & Partners Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Melloul | Melloul & Partners — Global Advisory",
    description:
      "Frank Melloul leads Melloul & Partners: strategic advisory, influence, and diplomacy.",
    images: ["/only_gold_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const origin = "https://melloulandpartners.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "Melloul & Partners",
        inLanguage: ["en", "fr"],
        publisher: { "@id": `${origin}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Melloul & Partners",
        url: `${origin}/`,
        logo: `${origin}/only_gold_logo.png`,
        email: "contact@melloulandpartners.com",
        founder: { "@id": `${origin}/#frank-melloul` },
        sameAs: [
          "https://www.linkedin.com/company/melloul-partners-global-advisory/?viewAsMember=true",
          "https://x.com/frankmelloul",
          "https://www.instagram.com/frankmelloul?igsh=YTM5aDI3OXY5eGRx",
          "https://www.facebook.com/share/1Gs4mWEmU3/?mibextid=wwXIfr",
        ],
      },
      {
        "@type": "Person",
        "@id": `${origin}/#frank-melloul`,
        name: "Frank Melloul",
        givenName: "Frank",
        familyName: "Melloul",
        url: `${origin}/`,
        jobTitle: "Founder",
        worksFor: { "@id": `${origin}/#organization` },
        knowsAbout: [
          "strategic advisory",
          "international affairs",
          "public affairs",
          "diplomacy",
        ],
        sameAs: [
          "https://x.com/frankmelloul",
          "https://www.instagram.com/frankmelloul?igsh=YTM5aDI3OXY5eGRx",
          "https://www.facebook.com/share/1Gs4mWEmU3/?mibextid=wwXIfr",
          "https://www.linkedin.com/company/melloul-partners-global-advisory/?viewAsMember=true",
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Inline script for immediate preload - executes before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!document.querySelector('link[rel="preload"][href="/only_gold_logo.png"]')) {
                  const link1 = document.createElement('link');
                  link1.rel = 'preload';
                  link1.href = '/only_gold_logo.png';
                  link1.as = 'image';
                  link1.type = 'image/png';
                  link1.setAttribute('fetchpriority', 'high');
                  document.head.appendChild(link1);
                }
              })();
            `,
          }}
        />

        {/* JSON-LD (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased">
        <PreloadResources />
        <LanguageProvider initialLocale="en">
          <LoadingScreen />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>

        <Toaster
          richColors
          closeButton
          position="bottom-right"
          theme="dark"
        />
        
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}

