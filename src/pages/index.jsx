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
          content="
            /* Short Keywords */
            password, username, security, cybersecurity, checker, tester, generator, 
            strong, secure, free, online, tool, test, check, analysis, strength, 
            weak, strong, breach, hacked, compromised, protection, safety, privacy,
            digital, identity, credentials, login, account, authentication, access,
            vault, manager, create, generate, make, build, form, creator, builder,

            /* Single Keywords */
            password-checker, username-checker, security-check, breach-check, 
            password-test, username-test, security-score, password-score, 
            username-security, password-security, credential-check, login-security,
            account-security, authentication-security, access-security, 
            password-generator, username-generator, credential-generator,
            password-creator, username-creator, secure-generator, random-generator,
            strong-password, secure-username, unique-username, complex-password,
            password-strength, username-strength, credential-strength,

            /* Medium Tail Keywords */
            password strength checker, username security test, free password tester, 
            breach check, secure credentials, digital identity protection,
            strong password generator, secure username creator, free security check,
            online password test, username vulnerability test, password security analysis,
            credential strength test, login security checker, account protection tool,
            data breach checker, hacked password test, compromised username check,
            cybersecurity analysis tool, digital protection service, identity security,
            password pattern recognition, security scoring system, breach protection,
            password recommendations, username suggestions, security best practices,

            /* Long Tail Keywords */
            free password strength checker online, secure username generator tool,
            test password security before using, check username vulnerability free,
            strong password creator with security score, best username generator secure,
            cybersecurity password analysis tool, digital identity protection service,
            how to check if password is strong, test username security before registration,
            free online credential strength tester, password breach detection tool,
            username compromise checker free, create secure passwords and usernames,
            password pattern recognition security, get security score for credentials,
            protect against data breaches tool, cybersecurity recommendations passwords,
            generate strong unique usernames free, test login credentials security,
            password security best practices checker, username creation security tips,
            free digital identity protection tool, online account security checker,
            prevent credential stuffing attacks, secure authentication credential generator,

            /* Specific Tool Keywords */
            AccessVaulted password tool, AccessVaulted username generator,
            AccessVaulted security checker, AccessVaulted breach detection,
            AccessVaulted credential analyzer, AccessVaulted pattern recognition,
            AccessVaulted security scoring, AccessVaulted recommendations,
            AccessVaulted password creator, AccessVaulted username builder,

            /* Industry Terms */
            cybersecurity tools, digital security, online protection, 
            identity management, credential security, authentication security,
            access management, password management, username security,
            data protection, privacy tools, security assessment,
            vulnerability assessment, risk analysis, threat detection,

            /* Action Keywords */
            check password now, test username free, generate secure credentials,
            create strong password, make secure username, analyze credential security,
            get security score, receive recommendations, improve password strength,
            enhance username security, protect digital identity, secure online accounts,
            prevent hacking attempts, avoid data breaches, strengthen login credentials
          "
        />
        <meta name="author" content="AccessVaulted" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#1a365d" />
        <meta name="msapplication-TileColor" content="#1a365d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

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
                  },
                  {
                    "@type": "Question",
                    "name": "How can I generate a secure password?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our password generator creates strong, unique passwords using advanced algorithms that combine length, complexity, and randomness for maximum security."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What makes a username secure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Secure usernames are unique, not easily guessable, don't contain personal information, and haven't been exposed in previous data breaches."
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Additional Structured Data for Tool */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AccessVaulted Security Checker",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Web Browser",
              "description": "Free password and username security checker tool",
              "url": "https://www.accessvaulted.com/",
              "author": {
                "@type": "Organization",
                "name": "AccessVaulted"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
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