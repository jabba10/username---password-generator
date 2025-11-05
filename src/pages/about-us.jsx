import React from 'react';
import Head from 'next/head';
import styles from './about-us.module.css';

const AboutUs = () => {
  return (
    <>
      {/* SEO & Metadata */}
      <Head>
        <title>About Our Free Username & Password Generator | AccessVaulted</title>
        <meta
          name="description"
          content="Learn about our free, secure username and password generator. 100% private, no data stored, works offline - protect your digital identity instantly."
        />
        <meta
          name="keywords"
          content="about password generator, username generator, free security tool, privacy-focused, offline password generator"
        />
        <meta name="author" content="AccessVaulted" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About Our Free Username & Password Generator | AccessVaulted" />
        <meta
          property="og:description"
          content="Generate unbreakable login credentials instantly — 100% free, secure, and private. Learn how our tool protects your digital identity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.accessvaulted.com/about" />
        <meta property="og:image" content="https://www.accessvaulted.com/images/about-preview.jpg" />
        <meta property="og:site_name" content="AccessVaulted" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Our Free Username & Password Generator | AccessVaulted" />
        <meta
          name="twitter:description"
          content="Learn about our secure, private credential generator that works entirely in your browser - no data stored, no tracking."
        />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/about-preview.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.accessvaulted.com/about" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About AccessVaulted Password Generator",
              "url": "https://www.accessvaulted.com/about",
              "description": "Free, secure username and password generator that protects your digital identity with private, offline credential generation.",
              "publisher": {
                "@type": "Organization",
                "name": "AccessVaulted",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.accessvaulted.com/images/logo.png"
                }
              }
            })
          }}
        />
      </Head>

      {/* Main Content */}
      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Our Free Username & Password Generator</h1>
            <p className={styles.heroSubtitle}>
              Generate unbreakable login credentials instantly — 100% free, secure, and private.
            </p>
          </div>
        </header>

        {/* Introduction Section */}
        <section className={styles.introSection}>
          <div className={styles.sectionContent}>
            <p className={styles.introText}>
              In today's digital world, weak login credentials are one of the leading causes of data breaches and account takeovers. That's why we built this free, powerful tool to help you create strong, unique usernames and passwords in seconds — so you can protect your email, social media, and all other online accounts.
            </p>
          </div>
        </section>

        {/* Why Strong Credentials Matter */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2>🔐 Why Strong Credentials Matter</h2>
            <p className={styles.sectionSubtitle}>
              Protect your digital identity from modern security threats
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.cardIcon}>🤖</div>
              <h3>Automated Attacks</h3>
              <p>Hackers use automated tools to guess common password combinations at massive scale.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardIcon}>🔁</div>
              <h3>Password Reuse Risks</h3>
              <p>Reusing passwords across multiple accounts puts all your accounts at risk if one is compromised.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>Predictable Patterns</h3>
              <p>Simple, predictable usernames and passwords are easily guessed by modern cracking tools.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <div className={styles.sectionHeader}>
            <h2>✅ How It Works</h2>
            <p className={styles.sectionSubtitle}>
              Simple, fast, and secure credential generation
            </p>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Enter Your Name</h3>
              <p>We generate a unique username using your name with added randomness and symbols for enhanced security.</p>
            </div>

            <div className={styles.stepArrow}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Customize Password</h3>
              <p>Choose length and character types (uppercase, numbers, symbols) for maximum strength and compatibility.</p>
            </div>

            <div className={styles.stepArrow}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>One-Click Generate</h3>
              <p>Instantly create and copy your credentials — no delays, no signup required. Ready to use immediately.</p>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className={styles.privacySection}>
          <div className={styles.sectionHeader}>
            <h2>🛡️ Privacy & Security First</h2>
            <p className={styles.sectionSubtitle}>
              Your security is our top priority - we built this tool with privacy at its core
            </p>
          </div>

          <div className={styles.privacyGrid}>
            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🚫</div>
              <div className={styles.privacyContent}>
                <h3>No Data Stored</h3>
                <p>Everything happens in your browser — we never save or track your credentials. Your generated passwords never leave your device.</p>
              </div>
            </div>

            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🌐</div>
              <div className={styles.privacyContent}>
                <h3>Works Offline</h3>
                <p>Once loaded, the tool runs entirely on your device. No internet connection required for generation after initial load.</p>
              </div>
            </div>

            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🔢</div>
              <div className={styles.privacyContent}>
                <h3>Randomized Output</h3>
                <p>Uses JavaScript's secure randomization to prevent prediction. Each generation creates completely unique credentials.</p>
              </div>
            </div>

            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🔒</div>
              <div className={styles.privacyContent}>
                <h3>No Trackers</h3>
                <p>Clean, safe, and focused on your security. No analytics, no tracking, no third-party scripts monitoring your usage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className={styles.useCasesSection}>
          <div className={styles.sectionHeader}>
            <h2>💡 Perfect For</h2>
            <p className={styles.sectionSubtitle}>
              Secure credential generation for every online need
            </p>
          </div>

          <div className={styles.useCasesGrid}>
            <div className={styles.useCaseCard}>
              <h3>📧 Email Accounts</h3>
              <p>Protect your primary communication and recovery method with strong, unique credentials.</p>
            </div>

            <div className={styles.useCaseCard}>
              <h3>📱 Social Media</h3>
              <p>Secure your personal and professional social media presence from unauthorized access.</p>
            </div>

            <div className={styles.useCaseCard}>
              <h3>🎮 Gaming Accounts</h3>
              <p>Protect your gaming progress, purchases, and virtual assets with secure login details.</p>
            </div>

            <div className={styles.useCaseCard}>
              <h3>💼 Work Accounts</h3>
              <p>Generate strong credentials for work-related services and professional accounts.</p>
            </div>

            <div className={styles.useCaseCard}>
              <h3>🏦 Financial Services</h3>
              <p>Secure your banking, investment, and financial management accounts with unbreakable passwords.</p>
            </div>

            <div className={styles.useCaseCard}>
              <h3>📚 Student Accounts</h3>
              <p>Protect educational resources, student portals, and academic records with secure credentials.</p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className={styles.missionSection}>
          <div className={styles.missionCard}>
            <h2>Our Mission</h2>
            <p>
              Whether you're a student, professional, or casual user, our tool helps you stay protected online — for free, forever. We believe that everyone deserves access to strong security tools without complexity or cost barriers.
            </p>
            <div className={styles.missionStats}>
              <div className={styles.missionStat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free Forever</div>
              </div>
              <div className={styles.missionStat}>
                <div className={styles.statNumber}>0</div>
                <div className={styles.statLabel}>Data Stored</div>
              </div>
              <div className={styles.missionStat}>
                <div className={styles.statNumber}>∞</div>
                <div className={styles.statLabel}>Unlimited Generations</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Generate Secure Credentials?</h2>
            <p>Start creating unbreakable usernames and passwords instantly. No signup required, completely free, and 100% private.</p>
            <div className={styles.ctaActions}>
              <a 
                href="/create-free-username-and-password-with-accessvaulted-generator" 
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              >
                Generate Secure Credentials Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;