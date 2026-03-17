import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Refund Policy | SONNY'S SHINING",
  description: "Refund Policy for Sonny's Shining preorders - what you need to know about refunds before and after release.",
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen">
      {/* Ticker tape */}
      <div className="ticker-tape">
        ★ REFUND POLICY ★ PREORDER TERMS ★ KNOW YOUR RIGHTS ★
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
        <p className="masthead-subtitle">Refund Policy</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="newspaper-rule-triple" />
        
        <div className="text-center mb-8">
          <h2 className="headline-primary text-3xl md:text-4xl">REFUND POLICY</h2>
          <p className="headline-secondary mt-2">Preorder &amp; Purchase Refunds</p>
        </div>

        <div className="newspaper-rule-ornate" />

        {/* Quick Summary Box */}
        <div className="banner-ad mt-8" style={{ background: 'var(--accent-red)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Short Version
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="bg-paper-cream bg-opacity-10 p-4 rounded">
              <p className="font-bold text-sm uppercase tracking-wide mb-2">Before Release</p>
              <p className="text-sm opacity-90">Full refund, no questions asked</p>
            </div>
            <div className="bg-paper-cream bg-opacity-10 p-4 rounded">
              <p className="font-bold text-sm uppercase tracking-wide mb-2">After Download</p>
              <p className="text-sm opacity-90">No refunds on digital products</p>
            </div>
          </div>
        </div>

        <div className="article-text space-y-8 mt-12">
          <section>
            <h3 className="headline-tertiary mb-4">§1. Preorder Refunds</h3>
            <div className="decorative-box">
              <p className="drop-cap">
                We understand that circumstances change. If you preorder Sonny&apos;s Shining and 
                later decide you want a refund, we&apos;re happy to oblige—as long as the game 
                hasn&apos;t been released yet. Before the release date, you may request a full 
                refund of your preorder for any reason.
              </p>
              
              <div className="shadow-box mt-6">
                <h4 className="font-bold text-sm uppercase tracking-wide mb-3">Preorder Refund Terms</h4>
                <ul className="vintage-list">
                  <li><strong>Timing:</strong> Request must be made BEFORE the game release date</li>
                  <li><strong>Amount:</strong> Full refund of the preorder price ($8)</li>
                  <li><strong>Method:</strong> Refund to original payment method via Stripe</li>
                  <li><strong>Processing:</strong> Refunds processed within 5-10 business days</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§2. Post-Release Policy</h3>
            <div className="classified-box" style={{ borderLeftColor: 'var(--accent-red)' }}>
              <p className="font-bold text-sm uppercase tracking-wide mb-3 text-accent-red">Important Notice</p>
              <p className="mb-4">
                Once the game has been released and you have received your download link or 
                activation key, <strong>no refunds will be provided</strong>. This is standard 
                practice for digital goods, as the product cannot be &quot;returned&quot; once 
                delivered.
              </p>
              <p className="text-sm text-ink-faded">
                By completing your preorder, you acknowledge and accept this policy.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§3. Platform-Specific Purchases</h3>
            <div className="shadow-box">
              <p className="mb-4">
                If you purchase Sonny&apos;s Shining through a third-party platform, their 
                refund policies apply:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Steam</h4>
                  <p className="text-sm">
                    Steam&apos;s refund policy allows refunds within 14 days of purchase, 
                    with less than 2 hours of playtime. See 
                    <a href="https://store.steampowered.com/steam_refunds" className="text-accent-red hover:underline" target="_blank" rel="noopener noreferrer"> Steam Refunds</a>.
                  </p>
                </div>
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">iOS App Store</h4>
                  <p className="text-sm">
                    Apple handles refunds for App Store purchases. Request through 
                    <a href="https://reportaproblem.apple.com" className="text-accent-red hover:underline" target="_blank" rel="noopener noreferrer"> reportaproblem.apple.com</a>.
                  </p>
                </div>
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Google Play</h4>
                  <p className="text-sm">
                    Google Play offers refunds within 48 hours of purchase. Contact 
                    <a href="https://support.google.com/googleplay/answer/2479637" className="text-accent-red hover:underline" target="_blank" rel="noopener noreferrer"> Google Play Support</a>.
                  </p>
                </div>
                <div className="bg-paper-aged p-4">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Direct Purchase</h4>
                  <p className="text-sm">
                    Purchases made directly through our website follow this refund policy.
                    Contact us at refunds@sonnysshining.com.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§4. Exceptional Circumstances</h3>
            <div className="decorative-box">
              <p className="mb-4">
                We may consider refunds in exceptional circumstances, including:
              </p>
              <ul className="vintage-list">
                <li><strong>Technical Issues:</strong> If the game is completely unplayable on your system and we cannot resolve the issue</li>
                <li><strong>Duplicate Purchases:</strong> If you accidentally purchased the game twice</li>
                <li><strong>Unauthorized Purchases:</strong> If someone made a purchase without your authorization</li>
                <li><strong>Legal Requirements:</strong> Where required by applicable consumer protection laws</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded">
                Exceptional circumstance refunds are reviewed on a case-by-case basis at our discretion.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§5. How to Request a Refund</h3>
            <div className="shadow-box">
              <p className="mb-4">To request a preorder refund:</p>
              <ol className="vintage-list" style={{ counterReset: 'item' }}>
                <li style={{ counterIncrement: 'item' }}>Email <span className="text-accent-red">refunds@sonnysshining.com</span></li>
                <li style={{ counterIncrement: 'item' }}>Include your order confirmation number</li>
                <li style={{ counterIncrement: 'item' }}>Include the email address used for purchase</li>
                <li style={{ counterIncrement: 'item' }}>State that you wish to cancel your preorder</li>
              </ol>
              <p className="mt-4">
                We aim to respond to all refund requests within 2 business days.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§6. Release Date Changes</h3>
            <div className="classified-box">
              <p className="mb-4">
                If the release date changes significantly:
              </p>
              <ul className="vintage-list">
                <li><strong>Minor Delays (1-3 months):</strong> Your preorder remains valid; no action needed</li>
                <li><strong>Major Delays (3+ months):</strong> We will notify you and offer a full refund if desired</li>
                <li><strong>Cancellation:</strong> If we cancel the game entirely, all preorders will be automatically refunded</li>
              </ul>
              <p className="mt-4 text-sm text-ink-faded">
                Current expected release: Christmas 2026
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§7. Chargebacks</h3>
            <div className="decorative-box" style={{ borderColor: 'var(--accent-red)' }}>
              <p className="font-bold text-sm uppercase tracking-wide mb-3 text-accent-red">Please Contact Us First</p>
              <p>
                If you have an issue with your purchase, please contact us before initiating 
                a chargeback with your bank or credit card company. We&apos;re happy to resolve 
                any legitimate concerns directly. Initiating a chargeback without first 
                contacting us may result in your accounts being flagged and future purchases 
                being declined.
              </p>
            </div>
          </section>

          <section>
            <h3 className="headline-tertiary mb-4">§8. Contact Us</h3>
            <div className="banner-ad" style={{ background: 'var(--ink-brown)' }}>
              <p className="text-sm mb-2">Refund Requests &amp; Questions</p>
              <p className="text-lg font-bold">refunds@sonnysshining.com</p>
              <p className="text-xs opacity-60 mt-2">Response time: 1-2 business days</p>
            </div>
          </section>
        </div>

        {/* Final Summary */}
        <div className="newspaper-rule-stars mt-12" />
        
        <div className="ornamental-frame decorative-box mt-8">
          <div className="corner-bl" />
          <div className="corner-br" />
          
          <h3 className="headline-tertiary text-center mb-6">Summary</h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="vintage-icon">✓</div>
              <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Before Release</h4>
              <p className="text-sm text-ink-faded">
                Full refund available at any time before the game ships
              </p>
            </div>
            
            <div>
              <div className="vintage-icon">⚠</div>
              <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">After Download</h4>
              <p className="text-sm text-ink-faded">
                No refunds once you receive the digital product
              </p>
            </div>
            
            <div>
              <div className="vintage-icon">💬</div>
              <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Questions?</h4>
              <p className="text-sm text-ink-faded">
                Contact us—we&apos;re here to help
              </p>
            </div>
          </div>
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
              <Link href="/terms" className="text-ink-faded hover:text-accent-red transition-colors uppercase tracking-wider">
                Terms of Service
              </Link>
              <Link href="/refunds" className="text-accent-red uppercase tracking-wider">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
