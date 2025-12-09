"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
  ];

  return (
    <div className="flex items-center gap-1 bg-navy-900/50 rounded-full p-1">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`relative px-3 py-1.5 text-xs font-medium tracking-wider rounded-full transition-all duration-300 ${
              isActive
                ? "text-navy-950 bg-gold-400"
                : "text-primary-400 hover:text-primary-200 bg-transparent"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}

