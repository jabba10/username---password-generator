import React from 'react';
import Head from 'next/head';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      {/* SEO & Metadata with Next.js Head */}
      <Head>
        {/* Basic Meta Tags */}
        <title>Free Password & Username Security Checker | AccessVaulted</title>
        <meta
          name="description"
          content="Test your password strength and username security instantly. Free, private, and powered by advanced cybersecurity algorithms."
        />
        <meta
          name="keywords"
          content="password strength checker, username security test, free password tester, breach check, secure credentials, digital identity protection"
        />
        <meta name="author" content="AccessVaulted" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Free Password & Username Security Checker | AccessVaulted" />
        <meta
          property="og:description"
          content="Analyze your password and username strength instantly. Get a security score and actionable recommendations for better protection."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.accessvaulted.com/" />
        <meta property="og:image" content="https://www.accessvaulted.com/images/security-check-preview.jpg" />
        <meta property="og:site_name" content="AccessVaulted" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Password & Username Security Checker | AccessVaulted" />
        <meta
          name="twitter:description"
          content="Check your credentials against real breach data and get personalized security recommendations — 100% private and free."
        />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/security-check-preview.jpg" />
        <meta name="twitter:site" content="@accessvaulted" />
        <meta name="twitter:creator" content="@accessvaulted" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.accessvaulted.com/" />

        {/* Preload critical image or font if needed */}
        {/* <link rel="preload" as="image" href="/images/security-check-preview.jpg" /> */}

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Password & Username Security Checker",
              "url": "https://www.accessvaulted.com/",
              "description":
                "Free tool to test password strength, username vulnerability, and exposure to data breaches. Powered by enterprise-grade cybersecurity analysis.",
              "publisher": {
                "@type": "Organization",
                "name": "AccessVaulted",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.accessvaulted.com/images/logo.png"
                }
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How does the password strength checker work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our tool analyzes your password against common patterns, dictionary attacks, and known breached passwords to assess its vulnerability."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is my data stored when I test my password?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. We do not store or log any credentials you enter. All analysis is performed securely in real-time and discarded immediately."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I check if my username is already compromised?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Our system checks your username against known breach databases to see if it's been exposed in past data leaks."
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>

      {/* Main Content */}
      <div className={styles.landingContainer}>
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Advanced Cybersecurity Solutions</h1>
            <p className={styles.heroSubtitle}>
              Protect your digital assets with enterprise-grade security tools and expert guidance
            </p>
            <div className={styles.heroActions}>
              <a 
                href="/create-free-username-and-password-with-accessvaulted-generator" 
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              >
                Secure Now
              </a>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2>Test Your Digital Identity Security</h2>
            <p className={styles.sectionSubtitle}>
              Our tools help you to check the strength of your username and password before using them
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              {
                icon: "🔍",
                title: "Password Strength Analysis",
                description: "Test your passwords strength to know it weaknesses using our tools.",
                action: "Test Your Password"
              },
              {
                icon: "👤",
                title: "Username Vulnerability Check",
                description: "Discover if your username is too predictable before using it.",
                action: "Check Username"
              },
              {
                icon: "🔄",
                title: "Pattern Recognition",
                description: "Our tools identifies common password patterns that are easy to guess.",
                action: "Analyze Patterns"
              },
              {
                icon: "📊",
                title: "Security Scoring",
                description: "Get a comprehensive security score for your username and password and a concise strategy on how to improve them.",
                action: "Get Your Score"
              },
              {
                icon: "🛡️",
                title: "Database Breaching Protection",
                description: "Our tools can help to prevent you against common data breaches by checking your username and password strength before using them.",
                action: "Check Breaches"
              },
              {
                icon: "💡",
                title: "Security Recommendations",
                description: "Our tools provides stronger usernames and passwords based on current cybersecurity best practices.",
                action: "Get Recommendations"
              }
            ].map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.cardIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a 
                  href="/create-free-username-and-password-with-accessvaulted-generator" 
                  className={styles.btnCard}
                >
                  {feature.action}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <div className={styles.sectionHeader}>
            <h2>How Our Security Testing Works</h2>
            <p className={styles.sectionSubtitle}>
              A simple process to ensure your digital identity remains protected
            </p>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Enter Your Intended Credentials</h3>
              <p>Type in the username and password you're considering using. Don't worry - we don't store any of your data.</p>
            </div>

            <div className={styles.stepArrow}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Comprehensive Analysis</h3>
              <p>Our system checks both your username and password against it weaknesses and common patterns.</p>
            </div>

            <div className={styles.stepArrow}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Get Detailed Results</h3>
              <p>Immediately after submitting your intended username and password, a new suggested username and password will be generated for you to use that is strong enough to protect your digital identity.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5M+</div>
              <div className={styles.statLabel}>Credentials Tested</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>93%</div>
              <div className={styles.statLabel}>Weak Passwords Detected</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Private & Secure</div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className={styles.testimonialSection}>
          <div className={styles.sectionHeader}>
            <h2>Trusted by Security-Conscious Users</h2>
            <p className={styles.sectionSubtitle}>
              What people are saying about our security testing tools
            </p>
          </div>

          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialText}>
                "As a cybersecurity professional, I recommend this tool to all my clients. It's helped identify weak passwords that would have otherwise gone unnoticed."
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>Joseph Smith</div>
                <div className={styles.authorTitle}>Security Analyst</div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialText}>
                "I've always worried about my online security but didn't know how to create strong passwords. This tool gives me confidence that my accounts are protected."
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>Felicia Davis</div>
                <div className={styles.authorTitle}>Regular User</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Test Your Credentials?</h2>
            <p>Check the strength of your usernames and passwords before using them online. Our free tool provides immediate feedback and recommendations.</p>
            <div className={styles.ctaActions}>
              <a 
                href="/create-free-username-and-password-with-accessvaulted-generator" 
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              >
                Test Your Credentials Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;