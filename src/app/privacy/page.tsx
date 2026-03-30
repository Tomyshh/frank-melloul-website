import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Melloul & Partners. Learn how we collect, use, and protect your personal data.",
  alternates: {
    canonical: "/privacy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-navy-950 text-primary-200 py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-gold-400 text-sm tracking-wide hover:text-gold-300 transition-colors mb-12 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-primary-100 mb-4">
          Privacy Policy
        </h1>
        <p className="text-primary-400 text-sm mb-12">
          Last updated: March 2025
        </p>

        <div className="space-y-10 text-primary-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              1. Introduction
            </h2>
            <p>
              Melloul &amp; Partners (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) is committed to protecting your personal data and
              respecting your privacy. This Privacy Policy explains how we
              collect, use, and safeguard information when you visit
              melloulandpartners.com (the &quot;Site&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              2. Information We Collect
            </h2>
            <p>
              We may collect the following categories of personal data when you
              interact with our Site:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-primary-400">
              <li>
                Contact information (name, email address) when you reach out to
                us via email.
              </li>
              <li>
                Usage data (pages visited, time spent, browser type) collected
                automatically through analytics tools.
              </li>
              <li>
                Technical data (IP address, device type, operating system)
                collected by our hosting infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-primary-400">
              <li>Respond to your inquiries and provide advisory services.</li>
              <li>Improve and optimize our Site&apos;s performance.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              4. Data Sharing
            </h2>
            <p>
              We do not sell or rent your personal data to third parties. We may
              share data with trusted service providers (hosting, analytics) who
              process data on our behalf and are bound by confidentiality
              obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              5. Cookies
            </h2>
            <p>
              Our Site may use essential cookies to ensure proper functionality.
              Analytics cookies may be used to understand how visitors interact
              with the Site. You may disable cookies in your browser settings,
              though some features may be affected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              6. Data Retention
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfil
              the purposes for which it was collected, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              7. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have rights to access,
              correct, delete, or restrict the processing of your personal data.
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:contact@melloulandpartners.com"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                contact@melloulandpartners.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              8. Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your personal data against unauthorised access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gold-400 uppercase tracking-wide mb-4">
              10. Contact
            </h2>
            <p>
              For any questions regarding this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:contact@melloulandpartners.com"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                contact@melloulandpartners.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
