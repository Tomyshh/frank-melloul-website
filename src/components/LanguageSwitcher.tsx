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
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`relative px-3 py-1.5 text-xs font-medium tracking-wider rounded-full transition-colors duration-300 ${
            locale === lang.code
              ? "text-navy-950"
              : "text-primary-400 hover:text-primary-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {locale === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-gold-400 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

