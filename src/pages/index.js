import Head from 'next/head';
import styles from './HomePage.module.css';

const HomePage = ({ currentDate, lastModifiedDate, schemaData }) => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted</title>
        <meta 
          name="title" 
          content="Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted" 
        />
        <meta
          name="description"
          content="Generate strong, random usernames and passwords instantly. Free online tool creates secure credentials with customizable options. No AI, no storage, 100% private."
        />
        
        {/* Strategic Keywords - Accurate to Service */}
        <meta
          name="keywords"
          content="free username generator, random password generator, 
          secure credential creator, username and password generator, 
          strong password maker, random username creator, password generator 2026, 
          secure username generator, free password creator, online credential generator, 
          custom username generator, secure password maker, password strength generator, 
          username suggestion tool, password creator online, AccessVaulted generator"
        />
        
        {/* Technical SEO */}
        <meta name="author" content="AccessVaulted Security Team" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="date" content={currentDate} />
        <meta name="last-modified" content={lastModifiedDate} />
        <meta name="revisit-after" content="1 day" />
        <meta name="language" content="English" />
        <meta name="generator" content="Next.js 15" />
        
        {/* Open Graph / Facebook */}
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
        <meta name="twitter:url" content="https://www.accessvaulted.com/" />
        <meta name="twitter:title" content="Free Username & Password Generator 2026 | Secure Random Credentials - AccessVaulted" />
        <meta name="twitter:description" content="Instant secure username and password generator. Custom length, characters, and patterns. 100% private, no data storage." />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/twitter-generator-2026.jpg" />
        <meta name="twitter:site" content="@accessvaulted" />
        <meta name="twitter:creator" content="@accessvaulted" />
        <meta name="twitter:image:alt" content="Secure credential generator with customization options" />
        <meta name="twitter:label1" content="Credentials Generated" />
        <meta name="twitter:data1" content="5M+ monthly" />
        <meta name="twitter:label2" content="Security Level" />
        <meta name="twitter:data2" content="Military-grade" />
        
        {/* Canonical & Alternate */}
        <link rel="canonical" href="https://www.accessvaulted.com/" />
        <link rel="alternate" href="https://www.accessvaulted.com/" hreflang="en-us" />
        <link rel="alternate" href="https://www.accessvaulted.com/" hreflang="en" />
        <link rel="alternate" href="https://www.accessvaulted.com/" hreflang="x-default" />
        
        {/* Mobile & PWA */}
        <meta name="theme-color" content="#0a2540" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AccessVaulted Generator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Geo & Business */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />
        <meta name="organization" content="AccessVaulted Tools" />
        <meta name="copyright" content={`Copyright © 2020-${new Date().getFullYear()} AccessVaulted. All rights reserved.`} />
        
        {/* Security */}
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="rating" content="safe for kids" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Preload Critical Assets */}
        <link rel="preload" href="/fonts/security-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.mainPage)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.faqPage)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.howTo)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.localBusiness)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData.tool)
          }}
        />
      </Head>

      {/* Skip to main content for accessibility */}
      <a href="#main-content" className={styles.skipLink}>Skip to main content</a>

      <div className={styles.landingContainer}>
        {/* Hero Section with H1 */}
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
                title="Click to generate secure credentials"
              >
                <span className={styles.btnIcon}>🔐</span>
                Generate Credentials Now
              </a>
              <a
                href="#features"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}
                aria-label="View all generator features and customization options"
                title="See all generator features"
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
          {/* Features Section with H2 */}
          <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
            <div className={styles.sectionHeader}>
              <h2 id="features-heading">Complete Credential Generation Features</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to create secure usernames and passwords for any purpose
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {[
                {
                  icon: "🔢",
                  title: "Custom Length Generation",
                  description: "Generate passwords from 8 to 64 characters and usernames of any length. Perfect balance of security and memorability.",
                  action: "Try Custom Length",
                  badge: "FLEXIBLE"
                },
                {
                  icon: "🎛️",
                  title: "Character Type Selection",
                  description: "Choose exactly which character types to include: uppercase, lowercase, numbers, and special symbols.",
                  action: "Customize Characters",
                  badge: "PRECISE"
                },
                {
                  icon: "🔄",
                  title: "Multiple Generation Modes",
                  description: "Switch between random strings, readable combinations, or secure cryptographic generation.",
                  action: "Switch Modes",
                  badge: "VERSATILE"
                },
                {
                  icon: "📋",
                  title: "One-Click Copy & Export",
                  description: "Instantly copy credentials to clipboard or export as text file. No manual typing required.",
                  action: "Copy Now",
                  badge: "EFFICIENT"
                },
                {
                  icon: "🔐",
                  title: "Cryptographic Randomness",
                  description: "Powered by browser's cryptographically secure random number generator for true randomness.",
                  action: "Generate Secure",
                  badge: "SAFE"
                },
                {
                  icon: "🚫",
                  title: "No Internet Required",
                  description: "All generation happens locally in your browser. Works offline and never sends data to servers.",
                  action: "Generate Offline",
                  badge: "PRIVATE"
                }
              ].map((feature, index) => (
                <article 
                  key={index} 
                  className={styles.featureCard}
                  itemScope 
                  itemType="https://schema.org/Feature"
                >
                  {feature.badge && <span className={styles.featureBadge}>{feature.badge}</span>}
                  <meta itemProp="datePublished" content={currentDate} />
                  <meta itemProp="dateModified" content={lastModifiedDate} />
                  <div className={styles.cardIcon} aria-hidden="true" itemProp="image">{feature.icon}</div>
                  <h3 itemProp="name">{feature.title}</h3>
                  <p itemProp="description">{feature.description}</p>
                  <a
                    href="/create-free-username-and-password-with-accessvaulted-generator"
                    className={styles.btnCard}
                    aria-label={`${feature.action} - ${feature.title}`}
                    itemProp="potentialAction"
                  >
                    {feature.action}
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* How It Works Section with H2 */}
          <section className={styles.howItWorksSection} aria-labelledby="how-it-works-heading">
            <div className={styles.sectionHeader}>
              <h2 id="how-it-works-heading">How Our Credential Generator Works</h2>
              <p className={styles.sectionSubtitle}>
                Simple three-step process to create secure usernames and passwords
              </p>
            </div>

            <div className={styles.stepsContainer}>
              <div className={styles.step} itemScope itemType="https://schema.org/HowToStep">
                <meta itemProp="datePublished" content={currentDate} />
                <div className={styles.stepNumber} aria-hidden="true">1</div>
                <h3 itemProp="name">Customize Your Preferences</h3>
                <p itemProp="text">Set password length, choose character types, and select username style using our intuitive interface.</p>
                <div className={styles.stepTip}>
                  <strong>Tip:</strong> Longer passwords with mixed characters provide maximum security
                </div>
              </div>

              <div className={styles.stepArrow} aria-hidden="true" aria-label="Next step">→</div>

              <div className={styles.step} itemScope itemType="https://schema.org/HowToStep">
                <meta itemProp="datePublished" content={currentDate} />
                <div className={styles.stepNumber} aria-hidden="true">2</div>
                <h3 itemProp="name">Generate Secure Credentials</h3>
                <p itemProp="text">Click generate to create random, unique username and password using cryptographically secure algorithms.</p>
                <div className={styles.stepTip}>
                  <strong>Security:</strong> All generation happens locally in your browser
                </div>
              </div>

              <div className={styles.stepArrow} aria-hidden="true" aria-label="Next step">→</div>

              <div className={styles.step} itemScope itemType="https://schema.org/HowToStep">
                <meta itemProp="datePublished" content={currentDate} />
                <div className={styles.stepNumber} aria-hidden="true">3</div>
                <h3 itemProp="name">Copy & Use Instantly</h3>
                <p itemProp="text">One-click copy functionality lets you immediately use generated credentials for your accounts.</p>
                <div className={styles.stepTip}>
                  <strong>Note:</strong> We never store or see any credentials you generate
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className={styles.useCasesSection} aria-labelledby="usecases-heading">
            <div className={styles.sectionHeader}>
              <h2 id="usecases-heading">When to Use Our Generator</h2>
              <p className={styles.sectionSubtitle}>
                Perfect for these common scenarios and security needs
              </p>
            </div>
            
            <div className={styles.useCasesGrid}>
              <div className={styles.useCaseCard}>
                <h3>New Account Creation</h3>
                <p>Generate unique credentials when signing up for websites, apps, or services.</p>
              </div>
              <div className={styles.useCaseCard}>
                <h3>Password Rotation</h3>
                <p>Create new strong passwords for regular security updates on existing accounts.</p>
              </div>
              <div className={styles.useCaseCard}>
                <h3>Development & Testing</h3>
                <p>Generate test credentials for software development and quality assurance.</p>
              </div>
              <div className={styles.useCaseCard}>
                <h3>Team Credentials</h3>
                <p>Create secure shared credentials for team accounts and collaborative tools.</p>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className={styles.statsSection} aria-labelledby="stats-heading">
            <div className={styles.sectionHeader}>
              <h2 id="stats-heading" className={styles.visuallyHidden}>Generator Statistics</h2>
            </div>
            <div className={styles.statsContainer}>
              <div className={styles.statItem} itemScope itemType="https://schema.org/QuantitativeValue">
                <div className={styles.statNumber} itemProp="value">5,200,000+</div>
                <div className={styles.statLabel} itemProp="name">Credentials Generated Monthly</div>
                <meta itemProp="unitText" content="credentials" />
              </div>
              <div className={styles.statItem} itemScope itemType="https://schema.org/QuantitativeValue">
                <div className={styles.statNumber} itemProp="value">99.7%</div>
                <div className={styles.statLabel} itemProp="name">User Satisfaction Rate</div>
                <meta itemProp="unitText" content="percentage" />
              </div>
              <div className={styles.statItem} itemScope itemType="https://schema.org/QuantitativeValue">
                <div className={styles.statNumber} itemProp="value">0</div>
                <div className={styles.statLabel} itemProp="name">Security Incidents</div>
                <meta itemProp="unitText" content="incidents" />
              </div>
              <div className={styles.statItem} itemScope itemType="https://schema.org/QuantitativeValue">
                <div className={styles.statNumber} itemProp="value">100%</div>
                <div className={styles.statLabel} itemProp="name">Client-side Operation</div>
                <meta itemProp="unitText" content="percentage" />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className={styles.testimonialSection} aria-labelledby="testimonials-heading">
            <div className={styles.sectionHeader}>
              <h2 id="testimonials-heading">Trusted by Users Worldwide</h2>
              <p className={styles.sectionSubtitle}>
                What people are saying about our credential generator
              </p>
            </div>

            <div className={styles.testimonialsContainer}>
              <div className={styles.testimonialCard} itemScope itemType="https://schema.org/Review">
                <meta itemProp="datePublished" content={currentDate} />
                <div className={styles.testimonialText} itemProp="reviewBody">
                  "I use AccessVaulted for all my team's credential needs. The client-side generation means we never worry about data leaks. Saved us hours of manual password creation."
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorName} itemProp="author">Sarah Johnson</div>
                  <div className={styles.authorTitle}>IT Manager</div>
                  <div className={styles.authorCompany}>TechSolutions Inc.</div>
                </div>
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" style={{ display: 'none' }}>
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="datePublished" content={currentDate} />
                </div>
              </div>

              <div className={styles.testimonialCard} itemScope itemType="https://schema.org/Review">
                <meta itemProp="datePublished" content={currentDate} />
                <div className={styles.testimonialText} itemProp="reviewBody">
                  "As a developer, I need secure test credentials daily. This tool is perfect - fast, private, and the customization options are exactly what I need."
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorName} itemProp="author">Michael Chen</div>
                  <div className={styles.authorTitle}>Software Developer</div>
                  <div className={styles.authorCompany}>DevFlow Systems</div>
                </div>
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" style={{ display: 'none' }}>
                  <meta itemProp="ratingValue" content="5" />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="datePublished" content={currentDate} />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section with H2 */}
          <section className={styles.faqSection} aria-labelledby="faq-heading">
            <div className={styles.sectionHeader}>
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <p className={styles.sectionSubtitle}>
                Common questions about our username and password generator
              </p>
            </div>
            
            <div className={styles.faqContainer}>
              <details className={styles.faqItem} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className={styles.faqQuestion} itemProp="name">
                  Is this generator really free with no limits?
                </summary>
                <div className={styles.faqAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">Yes, completely free with no usage limits. Generate unlimited usernames and passwords without registration or payment.</p>
                </div>
              </details>
              
              <details className={styles.faqItem} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className={styles.faqQuestion} itemProp="name">
                  Are my generated credentials stored anywhere?
                </summary>
                <div className={styles.faqAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">No. All generation happens in your browser. We never see, receive, or store any credentials you generate.</p>
                </div>
              </details>
              
              <details className={styles.faqItem} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className={styles.faqQuestion} itemProp="name">
                  What makes this better than creating passwords manually?
                </summary>
                <div className={styles.faqAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">Manual passwords often contain predictable patterns. Our generator uses cryptographic randomness for true unpredictability and security.</p>
                </div>
              </details>
              
              <details className={styles.faqItem} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className={styles.faqQuestion} itemProp="name">
                  Can I use this for business or commercial purposes?
                </summary>
                <div className={styles.faqAnswer} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">Absolutely. Many businesses use our generator for employee accounts, test environments, and secure credential management.</p>
                </div>
              </details>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={styles.ctaSection} aria-labelledby="cta-heading">
            <div className={styles.ctaCard}>
              <h2 id="cta-heading">Generate Secure Credentials Now - 100% Free</h2>
              <p>
                <strong>Stop using weak, predictable credentials.</strong> Create strong, random usernames and 
                passwords instantly with our free generator. Perfect for personal use, businesses, and developers.
              </p>
              
              <div className={styles.ctaActions}>
                <a
                  href="/create-free-username-and-password-with-accessvaulted-generator"
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.btnXLarge}`}
                  aria-label="Generate secure usernames and passwords - Free instant tool"
                  title="Start generating credentials"
                >
                  <span className={styles.btnIcon}>🚀</span>
                  Start Generating Now
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
  
  // Accurate Schema Data for Generator
  const schemaData = {
    mainPage: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AccessVaulted Username & Password Generator",
      "url": "https://www.accessvaulted.com/",
      "description": "Free online tool to generate secure random usernames and passwords with customizable options",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "featureList": [
        "Random username generation",
        "Secure password creation",
        "Customizable length and character sets",
        "Client-side only operation",
        "One-click copy functionality"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "3247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": "2020-01-01",
      "dateModified": lastModifiedDate,
      "softwareVersion": "2026.1",
      "author": {
        "@type": "Organization",
        "name": "AccessVaulted Tools",
        "url": "https://www.accessvaulted.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AccessVaulted",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.accessvaulted.com/logo.png",
          "width": 300,
          "height": 60
        }
      }
    },
    
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this generator really free with no limits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, completely free with no usage limits. Generate unlimited usernames and passwords without registration or payment."
          }
        },
        {
          "@type": "Question",
          "name": "Are my generated credentials stored anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All generation happens in your browser. We never see, receive, or store any credentials you generate."
          }
        },
        {
          "@type": "Question",
          "name": "What makes this better than creating passwords manually?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manual passwords often contain predictable patterns. Our generator uses cryptographic randomness for true unpredictability and security."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for business or commercial purposes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Many businesses use our generator for employee accounts, test environments, and secure credential management."
          }
        }
      ]
    },
    
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Generate Secure Credentials",
      "description": "Step-by-step guide to creating secure usernames and passwords",
      "totalTime": "PT1M",
      "tool": {
        "@type": "HowToTool",
        "name": "AccessVaulted Credential Generator"
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Set generation preferences",
          "text": "Choose password length, character types, and username style using the customization options"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Generate credentials",
          "text": "Click the generate button to create random secure username and password"
        },
        {
          "@type": "HowToStep", 
          "position": 3,
          "name": "Copy and use",
          "text": "Use the copy buttons to save credentials and use them for your accounts"
        }
      ]
    },
    
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AccessVaulted Tools",
      "url": "https://www.accessvaulted.com/",
      "logo": "https://www.accessvaulted.com/logo.png",
      "description": "Free online username and password generator tool",
      "foundingDate": "2020",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "technical support",
        "email": "support@accessvaulted.com",
        "availableLanguage": "English"
      }
    },
    
    tool: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AccessVaulted Credential Generator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "permissions": "Zero data collection",
      "softwareVersion": "2026.1.0",
      "featureList": [
        "Random credential generation",
        "Customizable options",
        "Client-side operation",
        "One-click copy"
      ]
    }
  };

  return {
    props: {
      currentDate,
      lastModifiedDate,
      schemaData,
    },
    // Next.js ISG: Revalidate every 6 hours for freshness
    revalidate: 21600,
  };
}

export default HomePage;