import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Retire les balises HTML et normalise les espaces (extraits, cartes, meta). */
export function htmlToPlainText(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function excerptFromHtml(html: string, max: number): string {
  const plain = htmlToPlainText(html);
  return plain.length > max ? `${plain.slice(0, max - 1)}…` : plain;
}

