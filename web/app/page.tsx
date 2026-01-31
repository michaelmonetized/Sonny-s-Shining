'use client';

import { useState } from 'react';

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
        ★ EXTRA! EXTRA! ★ NEW NOVEL AVAILABLE NOW ★ READ ALL ABOUT IT ★
      </div>

      {/* Masthead */}
      <header className="masthead animate-fade-in-up animation-delay-100">
        <div className="dateline max-w-6xl mx-auto px-4">
          <span>Vol. I · No. 1</span>
          <span className="edition-banner">Special Literary Edition</span>
          <span>Est. MCMXXV</span>
        </div>
        <h1 className="masthead-title mt-4">The Shining Gazette</h1>
        <p className="masthead-subtitle">All the News That&apos;s Fit to Bowl</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section className="animate-fade-in-up animation-delay-200">
          <div className="newspaper-rule-triple" />
          
          <div className="text-center mb-6">
            <p className="headline-tertiary mb-3">Breaking Literary News</p>
            <h2 className="headline-primary">
              SONNY&apos;S<br />SHINING
            </h2>
            <p className="headline-secondary">
              A Fever Dream of Violence & Heartbreak
            </p>
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
                  When Sonny Larino rolled his first perfect game at the age of twelve, nobody knew 
                  that this prodigious talent would become the most feared and beloved figure in 
                  all of Sunset Park. A tragedy dressed up in a party hat and trying not to cry, 
                  this groundbreaking novel merges the grit of 1920s Brooklyn with the absurdist 
                  violence of beat-em-up arcade classics.
                </p>
                <p>
                  The year is 1925. Prohibition has cast its shadow over the boroughs, speakeasies 
                  flourish in darkness, and the bowling alleys of Brooklyn have become battlegrounds 
                  where fortunes are won and lost, where honor is defended with fists as often as 
                  with strikes and spares.
                </p>
                <p>
                  Enter Sonny&mdash;a man whose preternatural gift with the pins masks a soul 
                  tormented by loss, driven by vengeance, and haunted by a love that transcends 
                  the boundaries of mortality itself.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="pull-quote animate-slide-in-left animation-delay-400">
                Every game Sonny plays is a séance, every strike a prayer, 
                every spare a hope whispered into the void.
              </blockquote>

              <div className="article-text mt-6">
                <p>
                  Drawing on the silent film aesthetic of early cinema and the raw energy of 
                  vaudeville performance, this tale weaves together comedy and tragedy in 
                  unexpected ways. Violence erupts with balletic grace; heartbreak strikes 
                  with the force of a perfect split.
                </p>
              </div>
            </div>

            {/* Right column - Sidebar content */}
            <div className="space-y-6">
              {/* Vintage illustration placeholder */}
              <div className="illustration-frame animate-fade-in-up animation-delay-200">
                <div className="illustration-inner">
                  <svg viewBox="0 0 200 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="260" fill="#e8dcc4"/>
                    {/* Bowling pin illustration */}
                    <ellipse cx="100" cy="220" rx="35" ry="25" fill="#2d2620" opacity="0.3"/>
                    <path d="M75 200 Q65 160 80 120 Q90 90 100 70 Q110 90 120 120 Q135 160 125 200 Q120 220 100 220 Q80 220 75 200Z" fill="#f4e8d3" stroke="#2d2620" strokeWidth="2"/>
                    <ellipse cx="100" cy="78" rx="18" ry="15" fill="#f4e8d3" stroke="#2d2620" strokeWidth="2"/>
                    <path d="M82 100 Q100 105 118 100" stroke="#8b2c2c" strokeWidth="3" fill="none"/>
                    <path d="M80 130 Q100 140 120 130" stroke="#8b2c2c" strokeWidth="3" fill="none"/>
                    {/* Stars */}
                    <text x="50" y="40" fontSize="20" fill="#a67c3d">★</text>
                    <text x="140" y="50" fontSize="16" fill="#a67c3d">★</text>
                    <text x="30" y="250" fontSize="14" fill="#a67c3d">★</text>
                    <text x="160" y="245" fontSize="18" fill="#a67c3d">★</text>
                    {/* Decorative text */}
                    <text x="100" y="20" textAnchor="middle" fontSize="8" fill="#4a423a" fontFamily="serif" letterSpacing="2">DIVINE LANES</text>
                  </svg>
                </div>
                <p className="illustration-caption">An artist&apos;s rendering of the fateful pin</p>
              </div>

              {/* The Author box */}
              <div className="shadow-box animate-fade-in-up animation-delay-300">
                <h3 className="classified-box-title">About the Author</h3>
                <p className="article-text text-sm !mb-0">
                  <strong>Michael Hurley</strong> is a writer of peculiar tales and 
                  chronicler of forgotten Americas. This is his debut novel, 
                  written during a fever and revised during several more.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="classified-box animate-fade-in-up animation-delay-400">
                <h3 className="classified-box-title">Particulars</h3>
                <ul className="vintage-list text-sm">
                  <li><strong>Genre:</strong> Literary Noir</li>
                  <li><strong>Setting:</strong> Brooklyn, 1925</li>
                  <li><strong>Themes:</strong> Loss, Redemption</li>
                  <li><strong>Style:</strong> Beat &apos;em up Prose</li>
                  <li><strong>Rating:</strong> Suitable for Adults</li>
                </ul>
              </div>

              {/* Stamp */}
              <div className="text-center py-4">
                <span className="stamp animate-fade-in animation-delay-500">
                  First Edition
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Preview Section */}
        <section className="mt-12 animate-fade-in-up animation-delay-500">
          <div className="newspaper-rule-stars" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">Exclusive Chapter Preview</h3>
          </div>

          <div className="woodcut-border mt-6">
            <div className="woodcut-border-inner">
              <div className="chapter-marker">Chapter One · The Divine Concession</div>
              
              <div className="article-text newspaper-columns">
                <p className="drop-cap">
                  The front door of Divine Lanes swung open to let the blue-grey afternoon 
                  light spill across the oiled floors. All six lanes shone in the bright 
                  gleam of the incoming day. The creak of Sonny&apos;s footsteps echoed off 
                  the walls while, in the dim lights, the motes of cigarette ash danced 
                  like snowfall in the windless air.
                </p>
                <p>
                  &ldquo;Be right there, Sugar&mdash;&rdquo;
                </p>
                <p>
                  From behind the concession, a squat, round man emerged, stopping short 
                  when he saw the figure silhouetted against the open door.
                </p>
                <p>
                  &ldquo;Well, I&apos;ll be double-damned. If it isn&apos;t the Prodigal 
                  Pin himself.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-double" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">What Critics Are Saying</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="testimonial-card animate-fade-in-up animation-delay-300">
              <p className="text-sm mb-2">
                &ldquo;A knockout. I haven&apos;t cried this hard since they repealed 
                the Volstead Act.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— The Brooklyn Eagle</p>
            </div>

            <div className="testimonial-card animate-fade-in-up animation-delay-400">
              <p className="text-sm mb-2">
                &ldquo;Hurley writes violence like poetry and heartbreak like a 
                punch to the gut.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— Literary Quarterly</p>
            </div>

            <div className="testimonial-card animate-fade-in-up animation-delay-500">
              <p className="text-sm mb-2">
                &ldquo;Part Dashiell Hammett, part fever dream, all unforgettable.&rdquo;
              </p>
              <p className="text-xs text-ink-faded">— Sunset Park Tribune</p>
            </div>
          </div>
        </section>

        {/* What Awaits Section */}
        <section className="mt-12">
          <div className="newspaper-rule-ornate" />
          
          <div className="ornamental-frame decorative-box mt-8 animate-fade-in-up animation-delay-500">
            <div className="corner-bl" />
            <div className="corner-br" />
            
            <h3 className="headline-tertiary text-center mb-6">Within These Pages Await</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="vintage-icon">🎳</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">High Stakes Bowling</h4>
                <p className="text-sm text-ink-faded">
                  Where every frame could be your last
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">👊</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Bone-Crunching Action</h4>
                <p className="text-sm text-ink-faded">
                  Combat choreographed like ballet
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">💔</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Devastating Romance</h4>
                <p className="text-sm text-ink-faded">
                  A love that defies death itself
                </p>
              </div>
              
              <div className="text-center">
                <div className="vintage-icon">🎭</div>
                <h4 className="font-bold mb-1 text-sm uppercase tracking-wide">Vaudeville Spirit</h4>
                <p className="text-sm text-ink-faded">
                  Comedy and tragedy intertwined
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad CTA */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="banner-ad">
            <p className="text-xs tracking-widest mb-2 opacity-75">A NOVEL BY MICHAEL HURLEY</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              ORDER YOUR COPY TODAY
            </h3>
            <p className="text-sm opacity-90 mb-6 max-w-xl mx-auto">
              Available now in hardcover, paperback, and electric editions. 
              Ask at your local bookseller or order direct.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="vintage-button vintage-button-gold">
                Buy Now
              </button>
              <button className="vintage-button vintage-button-outline" style={{ color: 'var(--paper-cream)', borderColor: 'var(--paper-cream)' }}>
                Read Sample
              </button>
            </div>
          </div>
        </section>

        {/* Cast of Characters */}
        <section className="mt-12 animate-fade-in-up animation-delay-500">
          <div className="newspaper-rule-stars" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">Dramatis Personæ</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="character-card">
              <div className="character-initial">S</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">Sonny Larino</h4>
                <p className="text-sm text-ink-brown">
                  Our tormented hero. A bowling prodigy whose perfect game at age twelve 
                  foretold a destiny soaked in tragedy. Haunted by the ghost of his 
                  beloved, he rolls through life seeking vengeance and redemption.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">R</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">The Ghost of Rose</h4>
                <p className="text-sm text-ink-brown">
                  Sonny&apos;s eternal love, present in absence. Her memory haunts 
                  every frame, every strike a tribute to what was lost. She appears 
                  in dreams and visions, guiding or tormenting.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">D</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">Divine Mike</h4>
                <p className="text-sm text-ink-brown">
                  Proprietor of Divine Lanes and keeper of secrets. A man who&apos;s 
                  seen everything and forgets nothing. His bowling alley is both 
                  sanctuary and battleground.
                </p>
              </div>
            </div>
            
            <div className="character-card">
              <div className="character-initial">B</div>
              <div>
                <h4 className="font-bold uppercase tracking-wide text-sm mb-1">The Bowery Boys</h4>
                <p className="text-sm text-ink-brown">
                  A gang of toughs who&apos;ve made the bowling alleys of Brooklyn 
                  their turf. They don&apos;t take kindly to Sonny&apos;s return. Violence 
                  follows them like smoke follows fire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The World Section */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-double" />
          
          <div className="section-title-ornate">
            <h3 className="headline-tertiary">The World of Sonny&apos;s Shining</h3>
          </div>

          <div className="newspaper-columns mt-6 article-text">
            <p className="drop-cap">
              Brooklyn in 1925 was a borough of contradictions—a place where immigrant 
              dreams met American nightmares, where speakeasies flourished behind locked 
              doors, and where a man&apos;s honor could be measured in strikes and spares.
            </p>
            <p>
              The bowling alleys of Sunset Park were more than recreation; they were 
              cathedrals of competition, temples where fortunes changed hands and 
              reputations were forged in the thunderous crash of falling pins.
            </p>
            <p>
              It was an era of silent films and vaudeville, where entertainment meant 
              spectacle and drama was writ large across the stage. This novel captures 
              that spirit—the exaggerated emotions, the melodramatic stakes, the way 
              every gesture carried the weight of meaning.
            </p>
            <p>
              And underlying it all, the steady rhythm of the lanes: the roll, the 
              crash, the reset. Life in Sunset Park moved to this beat, and so does 
              this story.
            </p>
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="mt-12 animate-fade-in-up animation-delay-600">
          <div className="newspaper-rule-ornate" />
          
          <div className="decorative-box mt-8 text-center">
            <h3 className="headline-tertiary mb-2">Subscribe to the Gazette</h3>
            <p className="text-sm text-ink-faded mb-4">Receive news of upcoming releases and exclusive excerpts</p>
            
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
            <p className="headline-tertiary mb-4">Don&apos;t Miss This</p>
            <h3 className="headline-primary text-3xl md:text-5xl mb-4">
              SONNY&apos;S SHINING
            </h3>
            <p className="headline-secondary mb-8">
              A Novel That Strikes the Heart
            </p>
            
            <div className="price-badge mx-auto mb-8">
              <span>Available<br/>Now</span>
            </div>
            
            <button className="vintage-button text-lg px-12 py-4">
              Get Your Copy
            </button>
            
            <p className="mt-6 text-xs text-ink-faded uppercase tracking-widest">
              Hardcover · Paperback · Electric Edition
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
              © MCMXXV · All Rights Reserved · Brooklyn, New York
            </p>
            <p className="text-xs text-ink-faded mt-4 max-w-lg mx-auto">
              A novel by Michael Hurley · Inspired by silent films, vaudeville, and the golden age of bowling
            </p>
          </div>
          
          <div className="bowling-pin-divider mt-6">
            <span>◆</span>
          </div>
          
          <p className="text-center text-xs text-ink-faded mt-4">
            &ldquo;In every frame, a story. In every strike, a soul.&rdquo;
          </p>
        </div>
      </footer>
    </div>
  );
}
