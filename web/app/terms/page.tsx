import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | SONNY'S SHINING",
  description: "Terms of Service for Sonny's Shining - the legal agreement governing your use of our game and services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      {/* Ticker tape */}
      <div className="ticker-tape">
        ★ LEGAL NOTICES ★ TERMS OF SERVICE ★ READ BEFORE PURCHASING ★
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
        <p className="masthead-subtitle">Terms of Service</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="newspaper-rule-triple" />
        
        <div className="text-center mb-8">
          <h2 className="headline-primary text-3xl md:text-4xl">TERMS OF SERVICE</h2>
          <p className="headline-secondary mt-2">Your Agreement With Us</p>
        </div>

        <div className="newspaper-rule-ornate" />

        <div className="article-text space-y-8 mt-8">
          <section>
            <h3 className="headline-tertiary mb-4">§1. Acceptance of Terms</h3>
            <div className="decorative-box">
              <p className="drop-cap">
                By accessing this website, preordering Sonny&apos;s Shining, or using our services, 
                you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not 
                agree to these Terms, please do not use our services. These Terms constitute a 
                legally binding agreement between you and Michael Hurley (&quot;we,&quot; &quot;us,&quot; 
                or &quot;our&quot;).
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§2. License Grant</h3>
            <div className="shadow-box">
              <p className="mb-4">Upon purchase, you receive:</p>
              <ul className="vintage-list">
                <li><strong>Personal License:</strong> A non-exclusive, non-transferable license to use the game for personal, non-commercial purposes</li>
                <li><strong>Installation:</strong> The right to install the game on devices you own or control</li>
                <li><strong>Updates:</strong> Access to updates and patches released for the game</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded border-t border-rule-light pt-4">
                This license does not grant ownership of the game, its code, artwork, music, or other intellectual property.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§3. Restrictions</h3>
            <div className="classified-box">
              <p className="mb-4">You agree NOT to:</p>
              <ul className="vintage-list">
                <li>Copy, modify, or distribute the game or any portion thereof</li>
                <li>Reverse engineer, decompile, or disassemble the game</li>
                <li>Remove any copyright or proprietary notices</li>
                <li>Use the game for commercial purposes without written permission</li>
                <li>Transfer your license to another person</li>
                <li>Create derivative works based on the game</li>
                <li>Use cheats, exploits, or unauthorized modifications</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§4. Preorders</h3>
            <div className="decorative-box">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">What You&apos;re Buying</h4>
                  <p className="text-sm">
                    A preorder is a commitment to purchase the game upon release. Your payment 
                    secures your copy at the preorder price.
                  </p>
                </div>
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Delivery</h4>
                  <p className="text-sm">
                    The game will be delivered digitally upon release (expected Christmas 2026). 
                    You will receive download instructions via email.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                See our <Link href="/refunds" className="text-accent-red hover:underline">Refund Policy</Link> for 
                information about preorder refunds.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§5. Intellectual Property</h3>
            <div className="shadow-box">
              <p className="mb-4">
                All content in Sonny&apos;s Shining is protected by copyright and other intellectual 
                property laws. This includes, but is not limited to:
              </p>
              <ul className="vintage-list">
                <li>Game code and software</li>
                <li>Artwork, animations, and visual design</li>
                <li>Music, sound effects, and audio</li>
                <li>Story, characters, and dialogue</li>
                <li>Trademarks and branding</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded">
                &quot;Sonny&apos;s Shining,&quot; the game characters, and associated imagery are 
                trademarks of Michael Hurley.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§6. User Content &amp; Streaming</h3>
            <div className="classified-box">
              <p className="mb-4">
                We encourage players to create and share content featuring our game:
              </p>
              <ul className="vintage-list">
                <li><strong>Let&apos;s Plays &amp; Streams:</strong> You may stream and create videos of gameplay for non-commercial purposes</li>
                <li><strong>Monetization:</strong> You may monetize gameplay videos through platform partner programs (YouTube, Twitch, etc.)</li>
                <li><strong>Attribution:</strong> Please credit &quot;Sonny&apos;s Shining by Michael Hurley&quot;</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded">
                We reserve the right to request removal of content that misrepresents the game or violates these terms.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§7. Disclaimers</h3>
            <div className="decorative-box" style={{ borderColor: 'var(--accent-red)' }}>
              <p className="mb-4 font-bold uppercase text-sm tracking-wide">Important Legal Notices</p>
              <p className="mb-4">
                THE GAME IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="mb-4">
                We do not warrant that the game will be uninterrupted, error-free, or free of 
                viruses or other harmful components. You assume all responsibility for your use 
                of the game.
              </p>
              <p className="text-sm text-ink-faded">
                Some jurisdictions do not allow the exclusion of implied warranties, so some of 
                the above exclusions may not apply to you.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§8. Limitation of Liability</h3>
            <div className="shadow-box">
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="vintage-list">
                <li>Loss of profits, data, or goodwill</li>
                <li>Service interruption or computer damage</li>
                <li>Cost of substitute goods or services</li>
                <li>Any other intangible losses</li>
              </ul>
              <p className="mt-4">
                Our total liability shall not exceed the amount you paid for the game.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§9. Age Requirements</h3>
            <div className="classified-box">
              <p>
                Sonny&apos;s Shining contains mature content including stylized violence, 
                dark themes, and adult situations. By purchasing or playing the game, you 
                confirm that you are at least 17 years of age or the age of majority in 
                your jurisdiction, whichever is greater.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§10. Governing Law</h3>
            <div className="decorative-box">
              <p>
                These Terms shall be governed by and construed in accordance with the laws 
                of the State of New York, United States, without regard to its conflict of 
                law provisions. Any disputes arising from these Terms shall be resolved in 
                the courts of New York County, New York.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§11. Modifications</h3>
            <div className="shadow-box">
              <p>
                We reserve the right to modify these Terms at any time. We will notify you 
                of material changes by posting the updated Terms on this page and updating 
                the effective date. Your continued use of our services after such changes 
                constitutes acceptance of the modified Terms.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§12. Severability</h3>
            <div className="classified-box">
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, 
                that provision shall be limited or eliminated to the minimum extent necessary, 
                and the remaining provisions shall remain in full force and effect.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§13. Contact</h3>
            <div className="banner-ad" style={{ background: 'var(--ink-brown)' }}>
              <p className="text-sm mb-2">Questions about these Terms?</p>
              <p className="text-lg font-bold">legal@sonnysshining.com</p>
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
              <Link href="/privacy" className="text-ink-faded hover:text-accent-red transition-colors uppercase tracking-wider">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-accent-red uppercase tracking-wider">
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
