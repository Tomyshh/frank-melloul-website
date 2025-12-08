"use client";

import { useEffect } from "react";

export default function PreloadResources() {
  useEffect(() => {
    // Only add preload if not already present
    if (document.querySelector('link[rel="preload"][href="/logo-gold.png"]')) {
      return;
    }

    // Preload critical images for faster loading
    const preloadLogoGold = document.createElement("link");
    preloadLogoGold.rel = "preload";
    preloadLogoGold.href = "/logo-gold.png";
    preloadLogoGold.as = "image";
    preloadLogoGold.type = "image/png";
    preloadLogoGold.setAttribute("fetchpriority", "high");
    document.head.appendChild(preloadLogoGold);

    const preloadLogoBlue = document.createElement("link");
    preloadLogoBlue.rel = "preload";
    preloadLogoBlue.href = "/logo-blue.png";
    preloadLogoBlue.as = "image";
    preloadLogoBlue.type = "image/png";
    preloadLogoBlue.setAttribute("fetchpriority", "high");
    document.head.appendChild(preloadLogoBlue);
  }, []);

  return null;
}
