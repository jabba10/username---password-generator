import Head from 'next/head';
import styles from './HomePage.module.css';

const HomePage = ({ currentDate, lastModifiedDate, schemaData }) => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted</title>
        <meta
          name="description"
          content="Generate strong, random usernames and passwords instantly. Free online tool creates secure credentials with customizable options. No AI, no storage, 100% private."
        />
        {/* High-Volume Keywords Only */}
        <meta
          name="keywords"
          content="free username generator, random password generator, secure credential creator, username and password generator, strong password maker, password generator 2026, secure username generator, free password creator"
        />
        {/* Technical SEO */}
        <meta name="author" content="AccessVaulted Security Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="date" content={currentDate} />
        <meta name="last-modified" content={lastModifiedDate} />
        <meta name="revisit-after" content="1 day" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.accessvaulted.com/" />
        <meta property="og:title" content="Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted" />
        <meta property="og:description" content="Generate secure usernames and strong passwords instantly. Customizable options, no registration, completely free." />
        <meta property="og:image" content="https://www.accessvaulted.com/images/og-generator-2026.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AccessVaulted Username and Password Generator Interface" />
        <meta property="og:site_name" content="AccessVaulted" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={lastModifiedDate} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted" />
        <meta name="twitter:description" content="Instant secure username and password generator. Custom length, characters, and patterns. 100% private, no data storage." />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/twitter-generator-2026.jpg" />
        <meta name="twitter:site" content="@accessvaulted" />
        <meta name="twitter:creator" content="@accessvaulted" />
        {/* Canonical */}
        <link rel="canonical" href="https://www.accessvaulted.com/" />
        {/* Mobile & PWA */}
        <meta name="theme-color" content="#0a2540" />
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData.mainPage) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData.faqPage) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData.howTo) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData.tool) }} />
      </Head>

      <a href="#main-content" className={styles.skipLink}>Skip to main content</a>
      <div className={styles.landingContainer}>
        {/* Hero */}
        <header className={styles.heroSection} role="banner">
          <div className={styles.heroContent}>
            <span className={styles.yearBadge}>2026 Edition</span>
            <h1 className={styles.heroTitle}>
              Free Secure Username & Password Generator - Create Strong Random Credentials
            </h1>
            <p className={styles.heroSubtitle}>
              <strong>Generate secure usernames and strong passwords instantly</strong> with our
              completely free online tool. Create <strong>random, unique credentials</strong> with
              customizable length, character types, and patterns.
              <em> No registration, no data storage, 100% client-side generation.</em>
            </p>
            <div className={styles.heroStats} id="hero-stats">
              <div className={styles.statBadge} tabIndex="0">
                <span className={styles.statNumber}>5M+</span>
                <span className={styles.statLabel}>Credentials Generated</span>
              </div>
              <div className={styles.statBadge} tabIndex="0">
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Client-side</span>
              </div>
              <div className={styles.statBadge} tabIndex="0">
                <span className={styles.statNumber}>Zero</span>
                <span className={styles.statLabel}>Data Storage</span>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a
                href="/create-free-username-and-password-with-accessvaulted-generator"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge} ${styles.btnPulse}`}
                aria-label="Generate secure usernames and passwords instantly - Free online tool"
              >
                <span className={styles.btnIcon}>🔐</span>
                Generate Credentials Now
              </a>
              <a
                href="#features"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}
                aria-label="View all generator features and customization options"
              >
                <span className={styles.btnIcon}>⚙️</span>
                View All Features
              </a>
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge} aria-hidden="true">🔒 Client-side Only</div>
              <div className={styles.trustBadge} aria-hidden="true">⚡ Instant Generation</div>
              <div className={styles.trustBadge} aria-hidden="true">🛡️ No Data Collection</div>
              <div className={styles.trustBadge} aria-hidden="true">🌐 Completely Free</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className={styles.mainContent}>
          {/* Features */}
          <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
            <div className={styles.sectionHeader}>
              <h2 id="features-heading">Complete Credential Generation Features</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to create secure usernames and passwords for any purpose
              </p>
            </div>
            <div className={styles.featuresGrid}>
              {[
                { icon: "🔢", title: "Custom Length", description: "8–64 characters. Balance security and memorability.", action: "Try Custom Length" },
                { icon: "🎛️", title: "Character Selection", description: "Uppercase, lowercase, numbers, symbols — your choice.", action: "Customize Characters" },
                { icon: "🔄", title: "Multiple Modes", description: "Random strings, readable combos, or cryptographic strength.", action: "Switch Modes" },
                { icon: "📋", title: "One-Click Copy", description: "Copy to clipboard or export as text instantly.", action: "Copy Now" },
                { icon: "🔐", title: "Cryptographic RNG", description: "Uses browser’s secure random generator for true randomness.", action: "Generate Secure" },
                { icon: "🚫", title: "Works Offline", description: "No internet needed. Never sends data to servers.", action: "Generate Offline" }
              ].map((f, i) => (
                <article key={i} className={styles.featureCard}>
                  <div className={styles.cardIcon} aria-hidden="true">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                  <a
                    href="/create-free-username-and-password-with-accessvaulted-generator"
                    className={styles.btnCard}
                    aria-label={`${f.action} - ${f.title}`}
                  >
                    {f.action}
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className={styles.howItWorksSection} aria-labelledby="how-it-works-heading">
            <div className={styles.sectionHeader}>
              <h2 id="how-it-works-heading">How Our Credential Generator Works</h2>
              <p className={styles.sectionSubtitle}>Simple three-step process to create secure credentials</p>
            </div>
            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber} aria-hidden="true">1</div>
                <h3>Customize Your Preferences</h3>
                <p>Set length, choose character types, and select username style.</p>
              </div>
              <div className={styles.stepArrow} aria-hidden="true">→</div>
              <div className={styles.step}>
                <div className={styles.stepNumber} aria-hidden="true">2</div>
                <h3>Generate Secure Credentials</h3>
                <p>Click generate using cryptographically secure algorithms.</p>
              </div>
              <div className={styles.stepArrow} aria-hidden="true">→</div>
              <div className={styles.step}>
                <div className={styles.stepNumber} aria-hidden="true">3</div>
                <h3>Copy & Use Instantly</h3>
                <p>One-click copy. We never store or see your credentials.</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className={styles.statsSection} aria-labelledby="stats-heading">
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5.2M+</div>
                <div className={styles.statLabel}>Monthly Generations</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>99.7%</div>
                <div className={styles.statLabel}>User Satisfaction</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>0</div>
                <div className={styles.statLabel}>Security Incidents</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Client-side</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className={styles.faqSection} aria-labelledby="faq-heading">
            <div className={styles.sectionHeader}>
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <p className={styles.sectionSubtitle}>Common questions about our generator</p>
            </div>
            <div className={styles.faqContainer}>
              {[
                { q: "Is this generator really free with no limits?", a: "Yes. Unlimited use, no registration, no payment." },
                { q: "Are my credentials stored anywhere?", a: "No. All generation happens in your browser. We never see your data." },
                { q: "What makes this better than manual passwords?", a: "Manual passwords are predictable. Ours uses true cryptographic randomness." },
                { q: "Can I use this for business?", a: "Absolutely. Many teams use it for secure account creation and testing." }
              ].map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <div className={styles.faqAnswer}><p>{faq.a}</p></div>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className={styles.ctaSection} aria-labelledby="cta-heading">
            <div className={styles.ctaCard}>
              <h2 id="cta-heading">Generate Secure Credentials Now - 100% Free</h2>
              <p>
                <strong>Stop using weak, predictable credentials.</strong> Create strong, random usernames and
                passwords instantly with our free generator.
              </p>
              <div className={styles.ctaActions}>
                <a
                  href="/create-free-username-and-password-with-accessvaulted-generator"
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnXLarge}`}
                  aria-label="Generate secure usernames and passwords - Free instant tool"
                >
                  Generate Now
                </a>
              </div>
              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>✅ No registration required</div>
                <div className={styles.ctaFeature}>✅ 100% client-side generation</div>
                <div className={styles.ctaFeature}>✅ Unlimited free usage</div>
                <div className={styles.ctaFeature}>✅ Customizable options</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const lastModifiedDate = now.toISOString();

  const schemaData = {
    mainPage: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AccessVaulted Username & Password Generator",
      "url": "https://www.accessvaulted.com/",
      "description": "Free online tool to generate secure random usernames and passwords",
      "applicationCategory": "UtilityApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "3247",
        "bestRating": "5"
      },
      "dateModified": lastModifiedDate,
      "softwareVersion": "2026.1",
      "author": { "@type": "Organization", "name": "AccessVaulted Tools" }
    },
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is this generator really free with no limits?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Unlimited use, no registration, no payment." } },
        { "@type": "Question", "name": "Are my credentials stored anywhere?", "acceptedAnswer": { "@type": "Answer", "text": "No. All generation happens in your browser." } },
        { "@type": "Question", "name": "What makes this better than manual passwords?", "acceptedAnswer": { "@type": "Answer", "text": "Manual passwords are predictable. Ours uses true cryptographic randomness." } },
        { "@type": "Question", "name": "Can I use this for business?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Many teams use it for secure account creation and testing." } }
      ]
    },
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Generate Secure Credentials",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Set preferences", "text": "Choose length and character types" },
        { "@type": "HowToStep", "position": 2, "name": "Generate", "text": "Click generate for secure credentials" },
        { "@type": "HowToStep", "position": 3, "name": "Copy", "text": "Use one-click copy to save credentials" }
      ]
    },
    tool: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AccessVaulted Credential Generator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "featureList": ["Random generation", "Customizable options", "Client-side operation"]
    }
  };

  return {
    props: {
      currentDate,
      lastModifiedDate,
      schemaData,
    },
    revalidate: 21600, // 6 hours (ISR)
  };
}

export default HomePage;