"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 border-t border-gold-500/10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/only_gold_logo.png"
              alt="Melloul & Partners"
              width={240}
              height={240}
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href="mailto:contact@melloulpartners.com"
              className="text-primary-300 hover:text-gold-500 text-sm transition-colors duration-300 animated-underline"
            >
              contact@melloulpartners.com
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/frank-melloul-158470/?originalSubdomain=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5 text-gold-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-primary-500 text-xs tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.footer.copyright}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
