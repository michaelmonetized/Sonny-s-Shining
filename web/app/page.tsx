'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PreorderButton } from './components/PreorderButton';

export default function Home() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Ticker tape announcement */}
      <div className="ticker-tape animate-fade-in">
        ★ NEW YEAR&apos;S EVE 1935 ★ SHE KEEPS RUNNING ★ YOU KEEP FOLLOWING ★ CHRISTMAS 2026 ★
      </div>

      {/* Masthead */}
      <header className="masthead animate-fade-in-up animation-delay-100">
        <div className="dateline max-w-6xl mx-auto px-4">
          <span>Vol. MCMXXXV · No. 1</span>
          <span className="edition-banner">Rubber Hose Edition</span>
          <span>December 31st, 1935</span>
        </div>
        <h1 className="masthead-title mt-4">The Shining Gazette</h1>
        <p className="masthead-subtitle">All the News That&apos;s Fit to Bowl</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section className="animate-fade-in-up animation-delay-200">
          <div className="newspaper-rule-triple" />
          
          <div className="text-center mb-6">
            <p className="headline-tertiary mb-3">A Beat-Em-Up Tragedy</p>
            <h2 className="headline-primary">
              SONNY&apos;S<br />SHINING
            </h2>
            <p className="headline-secondary">
              She Keeps Running. You Keep Following.
            </p>
            <div className="mt-6">
              <Link href="/play" className="vintage-button">
                Play the Game
              </Link>
            </div>
          </div>

          <div className="newspaper-rule-ornate" />

          {/* Main feature grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Left column - Main story */}
            <div className="md:col-span-2">
              <div className="byline">
                By <span className="decorative-initial">M</span>ichael Hurley · Special Correspondent
              </div>
              
              <div className="article-text">
                <p className="drop-cap">
                  New Year&apos;s Eve. Confetti in the air. Her hand in yours. The clock strikes 
                  midnight at Bertie&apos;s Bustling Bubbles, and for one perfect moment, 
                  Sonny—a lanky hound dog man with droopy yet determined eyes—holds his 
                  beloved Lucy close. A sleek red fox woman with a smile that goes right 
                  through you. Then Bertie whispers something in her ear. Her expression 
                  changes. She pulls away.
                </p>
                <p>
                  Through the crowd, through the celebration, she&apos;s gone. Out the 
                  back. Into the alley. And there—waiting in a limousine shaped like a 
                  giant bowling pin—is Kewpie. A corpulent pig man with the face of a 
                  cherub and the soul of a loan shark. She climbs in. The door closes. 
                  The taillights disappear into the night.
                </p>
                <p>
                  What follows is eight brutal levels of heartbreak and violence. Through 
                  speakeasies and back alleys, fire escapes and dance halls, chop shops 
                  and moonlit docks. Sonny fights his way across the city, always one 
                  step behind, always catching glimpses of that cream-tipped fox tail 
                  disappearing around corners.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="pull-quote animate-slide-in-left animation-delay-400">
                Every strike is a prayer. Every spare is a hope whispered 
                into the void. Every frame brings him closer to her.
              </blockquote>

              <div className="article-text mt-6">
                <p>
                  Rendered in the unmistakable style of 1930s rubber hose animation—think 
                  Fleischer Studios meets noir cinema—every character springs to life with 
                  noodle-like limbs, expressive pie-cut eyes, and the exaggerated movement 
                  of a Max Fleischer fever dream. Anthropomorphic animals populate this 
                  world: bears tend bar, roosters lord over tenement buildings, ravens run 
                  underground dance studios, and cats spin records at midnight clubs.
                </p>
              </div>
            </div>

            {/* Right column - Sidebar content */}
            <div className="space-y-6">
              {/* Vintage illustration placeholder */}
              <div className="illustration-frame animate-fade-in-up animation-delay-200">
                <div className="illustration-inner p-4">
                  <svg viewBox="0 0 200 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="280" fill="#e8dcc4"/>
                    {/* Sonny - Hound Dog silhouette */}
                    <ellipse cx="70" cy="250" rx="30" ry="15" fill="#2d2620" opacity="0.2"/>
                    {/* Simple rubber hose character body */}
                    <path d="M70 180 Q60 160 65 140 Q70 120 70 100 Q70 80 70 70" stroke="#2d2620" strokeWidth="12" strokeLinecap="round" fill="none"/>
                    {/* Head - Hound shape */}
                    <ellipse cx="70" cy="55" rx="25" ry="20" fill="#c9a55a" stroke="#2d2620" strokeWidth="2"/>
                    {/* Floppy ear */}
                    <path d="M48 50 Q35 60 40 80" stroke="#2d2620" strokeWidth="8" strokeLinecap="round" fill="none"/>
                    {/* Muzzle */}
                    <ellipse cx="85" cy="58" rx="12" ry="8" fill="#f4e8d3" stroke="#2d2620" strokeWidth="2"/>
                    {/* Pie-cut eyes */}
                    <circle cx="65" cy="48" r="6" fill="#2d2620"/>
                    <path d="M62 46 L68 50" stroke="#f4e8d3" strokeWidth="2"/>
                    {/* Nose */}
                    <ellipse cx="93" cy="58" rx="4" ry="3" fill="#2d2620"/>
                    {/* Arm with towel */}
                    <path d="M60 120 Q40 130 35 150" stroke="#2d2620" strokeWidth="8" strokeLinecap="round" fill="none"/>
                    <path d="M30 145 L40 160 L35 170" stroke="#8b2c2c" strokeWidth="4" strokeLinecap="round" fill="none"/>
                    {/* Lucy silhouette in distance */}
                    <ellipse cx="150" cy="255" rx="15" ry="8" fill="#2d2620" opacity="0.15"/>
                    <path d="M150 230 Q145 210 150 190 Q155 170 150 160" stroke="#2d2620" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4"/>
                    {/* Fox ears */}
                    <path d="M143 145 L147 155 M157 145 L153 155" stroke="#2d2620" strokeWidth="3" fill="none" opacity="0.4"/>
                    {/* Fox tail hint */}
                    <path d="M165 200 Q180 195 175 210" stroke="#c9a55a" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
                    {/* Bowling pins scattered */}
                    <path d="M170 260 Q168 250 172 240 Q175 235 172 230" stroke="#f4e8d3" strokeWidth="6" strokeLinecap="round" fill="none"/>
                    <path d="M180 265 Q178 255 182 245 Q185 240 182 235" stroke="#f4e8d3" strokeWidth="5" strokeLinecap="round" fill="none"/>
                    {/* Stars */}
                    <text x="15" y="30" fontSize="16" fill="#a67c3d">★</text>
                    <text x="175" y="35" fontSize="12" fill="#a67c3d">★</text>
                    {/* Decorative text */}
                    <text x="100" y="20" textAnchor="middle" fontSize="7" fill="#4a423a" fontFamily="serif" letterSpacing="1">NEW YEAR&apos;S EVE 1935</text>
                  </svg>
                </div>
                <p className="illustration-caption">The chase begins at midnight</p>
              </div>

              {/* Quick Facts */}
              <div className="classified-box animate-fade-in-up animation-delay-300">
                <h3 className="classified-box-title">Game Particulars</h3>
                <ul className="vintage-list text-sm">
                  <li><strong>Genre:</strong> Beat-Em-Up Noir</li>
                  <li><strong>Setting:</strong> New Year&apos;s Eve, 1935</li>
                  <li><strong>Art Style:</strong> Rubber Hose Animation</li>
                  <li><strong>Levels:</strong> 8 Brutal Stages</li>
                  <li><strong>Release:</strong> Christmas 2026</li>
                  <li><strong>Price:</strong> $8 Preorder</li>
                </ul>
              </div>

              {/* The Style box */}
              <div className="shadow-box animate-fade-in-up animation-delay-400">
                <h3 className="classified-box-title">The Aesthetic</h3>
                <p className="article-text text-sm !mb-0">
                  All characters rendered in <strong>Fleischer Studios style</strong>—rubber 
                  hose limbs, four-fingered gloves, pie-cut eyes. Anthropomorphic animals 
                  with fur, tails, and 1930s fashion. Think <em>Betty Boop</em> meets 
                  <em>Roger Rabbit</em> meets film noir.
                </p>
              </div>

              {/* Stamp */}
              <div className="text-center py-4">
                <span className="stamp animate-fade-in animation-delay-500">
                  Preorder Now
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* The Bosses Section */}
        <section className="mt-12 animate-fade-in-up animation-delay-500">
          <div className="newspaper-rule-stars" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">Eight Levels of Heartbreak</h3>
          </div>

          <div className="woodcut-border mt-6">
            <div className="woodcut-border-inner">
              <div className="chapter-marker">The Brutal Path to Lucy</div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🍸</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Bertie&apos;s Bubbles</h4>
                  <p className="text-xs text-ink-faded mt-1">The bear bartender</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🦀</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Charlie&apos;s Cantina</h4>
                  <p className="text-xs text-ink-faded mt-1">The crab &amp; mouse</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🐓</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Desi&apos;s Dwellings</h4>
                  <p className="text-xs text-ink-faded mt-1">The rooster slumlord</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🪶</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Tippi&apos;s Tango</h4>
                  <p className="text-xs text-ink-faded mt-1">The raven mistress</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🎵</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Bessie&apos;s Ballroom</h4>
                  <p className="text-xs text-ink-faded mt-1">The jazz cat DJ</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🔧</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Harry&apos;s Haulers</h4>
                  <p className="text-xs text-ink-faded mt-1">The bulldog mechanic</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🦉</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Ivy&apos;s Imports</h4>
                  <p className="text-xs text-ink-faded mt-1">The owl aristocrat</p>
                </div>
                <div className="text-center p-3 bg-paper-aged">
                  <div className="text-2xl mb-1">🐷</div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Kewpie&apos;s Klipper</h4>
                  <p className="text-xs text-ink-faded mt-1">The pig kingpin</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cast of Characters */}
        <section className="mt-12 animate-fade-in-up animation-delay-500">
          <div className="newspaper-rule-double" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">Dramatis Personæ</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="character-card">
              <div className="character-initial">S</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">Sonny</h4>
                <p className="text-xs text-accent-gold italic mb-1">Hound Dog · The Hero</p>
                <p className="text-sm text-ink-brown">
                  A lanky, athletic hound dog man with droopy yet determined eyes. His 
                  signature ball-shining towel hangs from his back pocket. Every throw 
                  is a prayer. Every catch is a memory of her.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">L</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">Lucy</h4>
                <p className="text-xs text-accent-gold italic mb-1">Red Fox · The Princess</p>
                <p className="text-sm text-ink-brown">
                  A knockout—a sleek red fox femme fatale with eyes that hold secrets. 
                  Her giggle trails behind her like musical notes. The cream tip of her 
                  tail is always the last thing you see.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">K</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">Kewpie</h4>
                <p className="text-xs text-accent-gold italic mb-1">Pig · The Villain</p>
                <p className="text-sm text-ink-brown">
                  Grotesque wealth made flesh—a corpulent pig man with the face of a 
                  cherub and the soul of a loan shark. His bowling-pin limo prowls 
                  the streets. Everyone in this city is on his payroll.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">B</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">The Bosses</h4>
                <p className="text-xs text-accent-gold italic mb-1">Various Animals · The Opposition</p>
                <p className="text-sm text-ink-brown">
                  Bears, crabs, roosters, ravens, cats, bulldogs, and owls. Each one 
                  guards a piece of the city. Each one stands between Sonny and Lucy. 
                  Each one falls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Awaits Section */}
        <section className="mt-12">
          <div className="newspaper-rule-ornate" />
          
          <div className="ornamental-frame decorative-box mt-8 animate-fade-in-up animation-delay-500">
            <div className="corner-bl" />
            <div className="corner-br" />
            
            <h3 className="headline-tertiary text-center mb-6">The Towel System</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="vintage-icon">🎳</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Catch</h4>
                <p className="text-sm text-ink-faded">
                  Time it right. Snatch projectiles from the air.
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">💥</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Return</h4>
                <p className="text-sm text-ink-faded">
                  Hurl them back. Perfect catches deal double damage.
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">⚡</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Whip</h4>
                <p className="text-sm text-ink-faded">
                  Close range stuns. The towel never misses.
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">🪢</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Grapple</h4>
                <p className="text-sm text-ink-faded">
                  Swing across gaps. Use the environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad CTA */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="banner-ad">
            <p className="text-xs tracking-widest mb-2 opacity-75">A GAME BY MICHAEL HURLEY</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              PREORDER NOW — $8
            </h3>
            <p className="text-lg opacity-90 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              🎄 Coming Christmas 2026 🎄
            </p>
            <p className="text-sm opacity-80 mb-6 max-w-xl mx-auto">
              Lock in your copy at the special preorder price. 
              Be among the first to chase Lucy through the neon-lit streets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/play" className="vintage-button vintage-button-outline" style={{ color: 'var(--paper-cream)', borderColor: 'var(--paper-cream)' }}>
                Play the Game
              </Link>
              <PreorderButton variant="gold" />
            </div>
            <p className="text-xs opacity-60 mt-4">
              Steam · iOS · Android · macOS
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-double" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">The Critical Acclaim</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="testimonial-card animate-fade-in-up animation-delay-300">
              <p className="text-sm mb-2">
                &ldquo;Cuphead meets Sin City. I couldn&apos;t stop playing until 
                I caught her. I never caught her.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— The Brooklyn Eagle</p>
            </div>

            <div className="testimonial-card animate-fade-in-up animation-delay-400">
              <p className="text-sm mb-2">
                &ldquo;The rubber hose aesthetic is flawless. The violence is 
                balletic. The heartbreak is real.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— Animation Weekly</p>
            </div>

            <div className="testimonial-card animate-fade-in-up animation-delay-500">
              <p className="text-sm mb-2">
                &ldquo;Part Hotline Miami, part heartbreak simulator. 
                I&apos;ve never felt so sad rolling a strike.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— Indie Game Review</p>
            </div>
          </div>
        </section>

        {/* The World Section */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-stars" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">The World of Sonny&apos;s Shining</h3>
          </div>

          <div className="newspaper-columns mt-6 article-text">
            <p className="drop-cap">
              The city is a character. Neon signs flicker over rain-slicked streets. 
              Jazz spills from speakeasy doorways. The camera swoops between Diner 
              Dash-style isometric views and Street Fighter boss battles, always 
              following Sonny as he fights his way toward her.
            </p>
            <p>
              Every level is a new district, a new boss, a new piece of Kewpie&apos;s 
              empire. The bear bartender. The crab and his mouse rider. The rooster 
              slumlord. The raven dominatrix. The cat DJ. The bulldog mechanic. 
              The owl aristocrat. And finally, on a yacht lit up like a casino 
              with bowling lanes on its deck—Kewpie himself.
            </p>
            <p>
              The art direction pulls from Fleischer Studios and noir cinema: 
              high contrast lighting, deep shadows, characters that spring and 
              stretch with every movement. Anthropomorphic animals in period 
              costume—bowling shirts and evening gowns, mechanic overalls and 
              silk bathrobes.
            </p>
            <p>
              And always, always, the flash of a red tail disappearing around 
              a corner. The echo of a giggle. The promise that maybe this time, 
              if you&apos;re fast enough, if you hit hard enough, you&apos;ll 
              catch her.
            </p>
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-ornate" />
          
          <div className="decorative-box mt-8 text-center">
            <h3 className="headline-tertiary mb-2">Subscribe to the Gazette</h3>
            <p className="text-sm text-ink-faded mb-4">Receive news of development updates and exclusive content</p>
            
            {emailSubmitted ? (
              <div className="stamp inline-block" style={{ transform: 'rotate(0deg)' }}>
                Subscription Confirmed!
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your electronic mail address"
                  className="vintage-input flex-1"
                  required
                />
                <button type="submit" className="vintage-button text-sm py-2 px-6">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 animate-fade-in-up animation-delay-700">
          <div className="newspaper-rule-triple" />
          
          <div className="text-center py-12">
            <p className="headline-tertiary mb-4">She Keeps Running</p>
            <h3 className="headline-primary text-3xl md:text-5xl mb-4">
              SONNY&apos;S SHINING
            </h3>
            <p className="headline-secondary mb-8">
              You Keep Following
            </p>
            
            <div className="price-badge mx-auto mb-8">
              <span>Christmas<br/>2026</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/play" className="vintage-button">
                Play the Game
              </Link>
              <PreorderButton size="large" />
            </div>
            
            <p className="mt-6 text-xs text-ink-faded uppercase tracking-widest">
              Steam · iOS · Android · macOS · $8 Preorder
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-rule-dark bg-paper-aged">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bowling-pin-divider">
            <span>🎳</span>
          </div>
          
          <div className="text-center">
            <p className="font-bold mb-2" style={{ fontFamily: 'var(--font-fraktur)', fontSize: '1.5rem' }}>
              The Shining Gazette
            </p>
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
              <Link href="/refunds" className="text-ink-faded hover:text-accent-red transition-colors uppercase tracking-wider">
                Refund Policy
              </Link>
            </div>
          </div>
          
          <div className="bowling-pin-divider mt-6">
            <span>◆</span>
          </div>
          
          <p className="text-center text-xs text-ink-faded mt-4">
            &ldquo;She keeps running. You keep following.&rdquo;
          </p>
        </div>
      </footer>
    </div>
  );
}
