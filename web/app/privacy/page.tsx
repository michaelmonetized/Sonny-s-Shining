import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | SONNY'S SHINING",
  description: "Privacy Policy for Sonny's Shining - how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      {/* Ticker tape */}
      <div className="ticker-tape">
        ★ LEGAL NOTICES ★ YOUR PRIVACY MATTERS ★ READ CAREFULLY ★
      </div>

      {/* Masthead */}
      <header className="masthead">
        <div className="dateline max-w-6xl mx-auto px-4">
          <span>Legal Department</span>
          <span className="edition-banner">Official Notice</span>
          <span>Effective: February 2024</span>
        </div>
        <h1 className="masthead-title mt-4" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}>
          <Link href="/" className="hover:text-accent-red transition-colors">
            The Shining Gazette
          </Link>
        </h1>
        <p className="masthead-subtitle">Privacy Policy</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="newspaper-rule-triple" />
        
        <div className="text-center mb-8">
          <h2 className="headline-primary text-3xl md:text-4xl">PRIVACY POLICY</h2>
          <p className="headline-secondary mt-2">How We Handle Your Information</p>
        </div>

        <div className="newspaper-rule-ornate" />

        <div className="article-text space-y-8 mt-8">
          <section>
            <h3 className="headline-tertiary mb-4">§1. Introduction</h3>
            <div className="decorative-box">
              <p className="drop-cap">
                This Privacy Policy explains how Michael Hurley (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) 
                collects, uses, and protects your personal information when you visit our website, 
                preorder Sonny&apos;s Shining, or interact with our services. We are committed to 
                protecting your privacy and handling your data transparently.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§2. Information We Collect</h3>
            <div className="shadow-box">
              <p className="mb-4">We collect the following types of information:</p>
              <ul className="vintage-list">
                <li><strong>Contact Information:</strong> Email address when you subscribe to our newsletter or preorder the game</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store credit card numbers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on site, browser type, device information</li>
                <li><strong>Cookies:</strong> Essential cookies for site functionality and analytics</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§3. How We Use Your Information</h3>
            <div className="classified-box">
              <p className="mb-4">Your information is used to:</p>
              <ul className="vintage-list">
                <li>Process preorders and deliver the game upon release</li>
                <li>Send you updates about development progress and release dates</li>
                <li>Respond to customer support inquiries</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§4. Third-Party Services</h3>
            <div className="decorative-box">
              <p className="mb-4">We use the following third-party services:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Stripe</h4>
                  <p className="text-sm">Payment processing. See <a href="https://stripe.com/privacy" className="text-accent-red hover:underline" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</p>
                </div>
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Vercel</h4>
                  <p className="text-sm">Website hosting and analytics. See <a href="https://vercel.com/legal/privacy-policy" className="text-accent-red hover:underline" target="_blank" rel="noopener noreferrer">Vercel&apos;s Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§5. Cookies</h3>
            <div className="shadow-box">
              <p className="mb-4">Our website uses cookies for:</p>
              <ul className="vintage-list">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded">
                You can disable cookies in your browser settings, though this may affect site functionality.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§6. Data Security</h3>
            <div className="classified-box">
              <p>
                We implement industry-standard security measures to protect your personal information, 
                including SSL encryption, secure servers, and limited access to personal data. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§7. Your Rights</h3>
            <div className="decorative-box">
              <p className="mb-4">You have the right to:</p>
              <ul className="vintage-list">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <span className="text-accent-red">privacy@sonnysshining.com</span>
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§8. Data Retention</h3>
            <div className="shadow-box">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes 
                outlined in this policy, unless a longer retention period is required by law. 
                Preorder information is retained until the game is delivered and any applicable 
                refund period has expired.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§9. Children&apos;s Privacy</h3>
            <div className="classified-box">
              <p>
                Sonny&apos;s Shining is rated for mature audiences. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected 
                information from a child, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§10. Changes to This Policy</h3>
            <div className="decorative-box">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page and updating the 
                &quot;Effective Date&quot; at the top. Your continued use of our services after 
                such modifications constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§11. Contact Us</h3>
            <div className="banner-ad" style={{ background: 'var(--ink-brown)' }}>
              <p className="text-sm mb-2">Questions about this Privacy Policy?</p>
              <p className="text-lg font-bold">privacy@sonnysshining.com</p>
            </div>
          </section>
        </div>

        <div className="newspaper-rule-triple mt-12" />
        
        <div className="text-center mt-8">
          <Link href="/" className="vintage-button vintage-button-outline">
            ← Return to Main Page
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-rule-dark bg-paper-aged mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bowling-pin-divider">
            <span>◆</span>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-ink-faded tracking-wider uppercase">
              © 2024-2026 · All Rights Reserved · A Michael Hurley Production
            </p>
            
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <Link href="/privacy" className="text-accent-red uppercase tracking-wider">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-ink-faded hover:text-accent-red transition-colors uppercase tracking-wider">
                Terms of Service
              </Link>
              <Link href="/refunds" className="text-ink-faded hover:text-accent-red transition-colors uppercase tracking-wider">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
