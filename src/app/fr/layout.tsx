import { LanguageProvider } from "@/context/LanguageContext";

export default function FrLayout({ children }: { children: React.ReactNode }) {
  // Override la locale pour toutes les routes sous /fr
  return <LanguageProvider initialLocale="fr">{children}</LanguageProvider>;
}

