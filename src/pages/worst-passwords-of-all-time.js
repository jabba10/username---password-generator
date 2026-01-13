import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './WorstPasswords.module.css';

const WorstPasswords = ({ currentDate, lastModifiedDate }) => {
  return (
    <>
      {/* SEO & Metadata */}
      <Head>
        <title>Worst Passwords of All Time | Password Security | AccessVaulted</title>
        <meta
          name="description"
          content="Discover the truth about '123456' and other worst passwords of all time. Learn why weak passwords are dangerous and how to create strong, secure alternatives."
        />
        <meta
          name="keywords"
          content="worst passwords list, insecure passwords, password security, weak passwords, common passwords, password protection"
        />
        <meta name="author" content="AccessVaulted Cybersecurity Team" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a365d" />

        {/* Build-time generated dates */}
        <meta name="date" content={currentDate} />
        <meta name="last-modified" content={lastModifiedDate} />

        {/* Additional Meta Tags */}
        <meta name="subject" content="Password Security" />
        <meta name="classification" content="Cybersecurity, Password Protection" />
        <meta name="category" content="technology cybersecurity" />
        <meta name="language" content="EN" />
        <meta name="abstract" content="Analysis of the worst passwords of all time and why they threaten your online security" />
        <meta name="topic" content="Password Security and Protection" />
        <meta name="summary" content="Comprehensive guide to understanding and avoiding the most common and insecure passwords" />
        <meta name="designer" content="AccessVaulted Security Team" />
        <meta name="copyright" content="AccessVaulted" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="Safe For Kids" />

        {/* Open Graph */}
        <meta property="og:title" content="Worst Passwords of All Time | Password Security | AccessVaulted" />
        <meta
          property="og:description"
          content="Discover the truth about '123456' and other worst passwords. Learn why weak passwords are dangerous and how to protect yourself."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.accessvaulted.com/worst-passwords-list" />
        <meta property="og:image" content="https://www.accessvaulted.com/images/worst-passwords-preview.jpg" />
        <meta property="og:site_name" content="AccessVaulted" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={lastModifiedDate} />
        <meta property="article:published_time" content={lastModifiedDate} />
        <meta property="article:modified_time" content={lastModifiedDate} />
        <meta property="article:author" content="AccessVaulted Security Team" />
        <meta property="article:section" content="Password Security" />
        <meta property="article:tag" content="worst passwords" />
        <meta property="article:tag" content="password security" />
        <meta property="article:tag" content="insecure passwords" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Worst Passwords of All Time | Security Guide" />
        <meta
          name="twitter:description"
          content="Discover the most common and insecure passwords that put your accounts at risk."
        />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/worst-passwords-preview.jpg" />
        <meta name="twitter:site" content="@AccessVaulted" />
        <meta name="twitter:creator" content="@AccessVaulted" />
        <meta name="twitter:label1" content="Reading time" />
        <meta name="twitter:data1" content="8 minutes" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.accessvaulted.com/worst-passwords-list" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "The Truth About '123456' and Other Worst Passwords of All Time",
              "description": "Analysis of the most common and insecure passwords that continue to threaten online security worldwide.",
              "image": "https://www.accessvaulted.com/images/worst-passwords-preview.jpg",
              "author": {
                "@type": "Organization",
                "name": "AccessVaulted Security Team",
                "url": "https://www.accessvaulted.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AccessVaulted",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.accessvaulted.com/images/logo.png"
                }
              },
              "datePublished": lastModifiedDate,
              "dateModified": lastModifiedDate,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.accessvaulted.com/worst-passwords-list"
              },
              "articleSection": "Password Security",
              "keywords": "worst passwords, insecure passwords, password security, weak passwords",
              "articleBody": "Comprehensive analysis of common weak passwords and strategies for creating strong, secure alternatives.",
              "wordCount": "2800",
              "timeRequired": "PT8M",
              "inLanguage": "en-US"
            })
          }}
        />

        {/* Additional Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.accessvaulted.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://www.accessvaulted.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Worst Passwords List",
                  "item": "https://www.accessvaulted.com/worst-passwords-list"
                }
              ]
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the worst password of all time?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "'123456' has consistently ranked as the worst and most common password for years, appearing in millions of breached accounts worldwide.",
                    "dateCreated": lastModifiedDate
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why are simple passwords like 'password' so dangerous?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simple passwords can be guessed in seconds by automated hacking tools, providing instant access to your accounts and personal information.",
                    "dateCreated": lastModifiedDate
                  }
                },
                {
                  "@type": "Question",
                  "name": "How quickly can hackers crack weak passwords?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Passwords like '123456' or 'password' can be cracked in less than one second using modern hacking tools and techniques.",
                    "dateCreated": lastModifiedDate
                  }
                }
              ]
            })
          }}
        />

        {/* Additional Technical SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Head>

      <div className={styles.articleContainer}>
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The Truth About "123456" and Other Worst Passwords of All Time</h1>
            <p className={styles.heroSubtitle}>
              Discover why millions still use incredibly weak passwords and how these common choices put your digital security at serious risk.
            </p>
          </div>
        </header>

        {/* Main Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>The Alarming Reality of Password Security</h2>
            <p className={styles.sectionSubtitle}>
              How simple, predictable passwords continue to dominate despite decades of security warnings
            </p>
          </div>

          <div className={styles.articleCard}>
            <div className={styles.articleContent}>
              <div className={styles.contentBlock}>
                <h3 className={styles.contentBlockTitle}>The Infamous "123456"</h3>
                <p className={styles.contentBlockText}>Year after year, "<strong className={styles.contentBlockStrong}>123456</strong>" consistently tops the <strong className={styles.contentBlockStrong}>worst passwords list</strong>. Despite countless security breaches and warnings, millions of people continue to use this incredibly weak password to protect their sensitive accounts. The shocking truth? Hackers can crack this password in <strong className={styles.contentBlockStrong}>less than one second</strong> using basic automated tools.</p>
                <p className={styles.contentBlockText}>What makes "123456" so dangerous isn't just its simplicity—it's the false sense of security it provides. Users often think "it's just one account" or "no one would target me," but automated attacks don't discriminate. Every account with this password becomes an easy target for credential stuffing attacks and automated breaches.</p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.contentBlockTitle}>Why Bad Passwords Persist</h3>
                <p className={styles.contentBlockText}>The persistence of weak passwords stems from several factors: convenience, password fatigue, and underestimation of risks. Many users create dozens of online accounts and struggle to remember complex passwords for each one. This leads to password reuse and simplification, creating security vulnerabilities across multiple platforms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Grid */}
        <section className={styles.technologiesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>The Worst Passwords of All Time</h2>
            <p className={styles.sectionSubtitle}>
              A revealing look at the most common and insecure password choices
            </p>
          </div>

          <div className={styles.technologiesGrid}>
            {[
              {
                icon: "🔓",
                title: "123456",
                description: "The perennial worst password, used by millions worldwide. Can be cracked instantly.",
                status: "Extreme Risk"
              },
              {
                icon: "🔑",
                title: "password",
                description: "Literally the word 'password' - astonishingly common despite obvious insecurity.",
                status: "Extreme Risk"
              },
              {
                icon: "❌",
                title: "12345678",
                description: "Slightly longer but equally predictable sequential number pattern.",
                status: "Critical Risk"
              },
              {
                icon: "🏆",
                title: "qwerty",
                description: "Keyboard pattern password that offers no real security.",
                status: "Critical Risk"
              },
              {
                icon: "💖",
                title: "iloveyou",
                description: "Emotional passwords are easily guessed and frequently used.",
                status: "High Risk"
              },
              {
                icon: "👤",
                title: "admin",
                description: "Default administrative password never changed by users.",
                status: "Critical Risk"
              }
            ].map((tech, index) => (
              <div key={index} className={styles.technologyCard}>
                <div className={styles.techIcon}>{tech.icon}</div>
                <h3 className={styles.techCardTitle}>{tech.title}</h3>
                <p className={styles.techCardDescription}>{tech.description}</p>
                <span className={`${styles.techStatus} ${
                  tech.status === 'Extreme Risk' ? styles.statusExtreme :
                  tech.status === 'Critical Risk' ? styles.statusCritical :
                  styles.statusHighRisk
                }`}>
                  {tech.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Detection Section */}
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>Why These Passwords Are So Dangerous</h2>
            <p className={styles.sectionSubtitle}>
              Understanding the technical vulnerabilities of common password choices
            </p>
          </div>

          <div className={styles.articleCard}>
            <div className={styles.articleContent}>
              <div className={styles.contentBlock}>
                <h3 className={styles.contentBlockTitle}>The Hacker's Toolkit</h3>
                <p className={styles.contentBlockText}>Modern hackers use sophisticated tools that can test thousands of password combinations per second. Dictionary attacks, which test common words and phrases, instantly crack passwords like "password" or "iloveyou." Brute force attacks systematically try every possible combination, making short passwords like "123456" extremely vulnerable.</p>
                <p className={styles.contentBlockText}>Credential stuffing attacks take advantage of password reuse. When a data breach occurs, hackers obtain username/password pairs and automatically test them on hundreds of other websites. If you use the same password everywhere, one breach can compromise all your accounts.</p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.contentBlockTitle}>The Psychology of Weak Passwords</h3>
                <p className={styles.contentBlockText}>Many users choose passwords based on memorable patterns, personal information, or common phrases. Birthdays, pet names, favorite sports teams—all these are easily discoverable through social media. Hackers build psychological profiles of targets and include this information in their attack dictionaries.</p>
                <p className={styles.contentBlockText}>The "it won't happen to me" mentality contributes significantly to poor password habits. Many users believe they're not important enough to be targeted, but automated attacks don't care who you are—they target everyone using weak credentials.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>How to Avoid Password Pitfalls</h2>
            <p className={styles.sectionSubtitle}>
              Practical strategies for creating and maintaining strong passwords
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {[
              {
                icon: "🔢",
                title: "Length Over Complexity",
                description: "A longer password is stronger than a complex short one. Aim for at least 12 characters."
              },
              {
                icon: "🔄",
                title: "Unique Everywhere",
                description: "Never reuse passwords across different websites or services."
              },
              {
                icon: "🎲",
                title: "Random Generation",
                description: "Use password generators to create truly random, unpredictable passwords."
              },
              {
                icon: "📝",
                title: "Password Manager",
                description: "Store and manage passwords securely without needing to memorize them all."
              },
              {
                icon: "✅",
                title: "Two-Factor Authentication",
                description: "Add an extra layer of security beyond just your password."
              },
              {
                icon: "🔍",
                title: "Regular Updates",
                description: "Change passwords periodically, especially after security breaches."
              }
            ].map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitContentTitle}>{benefit.title}</h3>
                  <p className={styles.benefitContentText}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className={styles.comparisonSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>Weak vs. Strong Password Examples</h2>
            <p className={styles.sectionSubtitle}>
              Understanding what makes a password secure or vulnerable
            </p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonOld}>
                <div className={styles.comparisonHeader}>
                  <h3 className={styles.comparisonHeaderTitle}>❌ Weak Passwords</h3>
                  <p className={styles.comparisonHeaderSubtitle}>Instant Break-in</p>
                </div>
                <ul className={styles.comparisonList}>
                  <li className={styles.comparisonListItem}>123456 (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>password (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>qwerty (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>letmein (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>football (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>monkey (cracks in less than 1 second)</li>
                  <li className={styles.comparisonListItem}>sunshine (cracks in less than 1 second)</li>
                </ul>
              </div>
              <div className={styles.comparisonNew}>
                <div className={styles.comparisonHeader}>
                  <h3 className={styles.comparisonHeaderTitle}>✅ Strong Passwords</h3>
                  <p className={styles.comparisonHeaderSubtitle}>Years to Crack</p>
                </div>
                <ul className={styles.comparisonList}>
                  <li className={styles.comparisonListItem}>Tr0ub4dor&3 (3 days)</li>
                  <li className={styles.comparisonListItem}>correct horse battery staple (centuries)</li>
                  <li className={styles.comparisonListItem}>X8!kP$2mL9#q (thousands of years)</li>
                  <li className={styles.comparisonListItem}>PurpleElephant$Jumping47 (millennia)</li>
                  <li className={styles.comparisonListItem}>Winter#Snowflake&2024! (millennia)</li>
                  <li className={styles.comparisonListItem}>B1gR3dD0g$RunsF4st (millennia)</li>
                  <li className={styles.comparisonListItem}>C0mpl3x!Ty#W1ns@lways (millennia)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Section */}
        <section className={styles.implementationSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>Action Steps for Better Password Security</h2>
            <p className={styles.sectionSubtitle}>
              Practical measures to improve your password habits starting today
            </p>
          </div>

          <div className={styles.practicesContainer}>
            <div className={styles.practiceCard}>
              <div className={styles.practiceIcon}>🔍</div>
              <div className={styles.practiceContent}>
                <h3 className={styles.practiceContentTitle}>Audit Your Current Passwords</h3>
                <p className={styles.practiceContentText}>Check if any of your passwords appear on common worst password lists. Be honest with yourself—if you're using simple patterns or personal information, it's time for a change. Start with your most important accounts first.</p>
              </div>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceIcon}>🔄</div>
              <div className={styles.practiceContent}>
                <h3 className={styles.practiceContentTitle}>Implement a Password Strategy</h3>
                <p className={styles.practiceContentText}>Adopt a systematic approach to password creation. Use passphrases (multiple random words) or truly random character strings. Consider using a reputable password manager to handle complexity and uniqueness.</p>
              </div>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceIcon}>🎯</div>
              <div className={styles.practiceContent}>
                <h3 className={styles.practiceContentTitle}>Prioritize Critical Accounts</h3>
                <p className={styles.practiceContentText}>Focus on securing email, banking, and social media accounts first. These often serve as gateways to other accounts through password reset functions. Use your strongest passwords for these services.</p>
              </div>
            </div>

            <div className={styles.practiceCard}>
              <div className={styles.practiceIcon}>📚</div>
              <div className={styles.practiceContent}>
                <h3 className={styles.practiceContentTitle}>Educate and Share Knowledge</h3>
                <p className={styles.practiceContentText}>Help friends and family understand password risks. Share this information with colleagues at work. Password security is a collective responsibility in our connected digital world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Outlook Section */}
        <section className={styles.futureSection}>
          <div className={styles.futureCard}>
            <h3 className={styles.futureCardTitle}>The Password Security Paradox</h3>
            <p className={styles.futureCardText}>Despite decades of warnings and countless security breaches, weak passwords like "123456" continue to dominate. This persistence highlights a fundamental challenge in cybersecurity: convenience often outweighs security concerns. However, with modern tools like password managers and increased awareness, creating and maintaining strong passwords has never been easier.</p>
            <p className={styles.futureTip}>
              <strong className={styles.futureTipStrong}>Remember:</strong> Your password is often the only barrier between hackers and your personal information, financial data, and digital identity. Taking a few minutes to create strong, unique passwords can prevent years of potential problems. Don't be another statistic in the next data breach report.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaCardTitle}>Create Secure Passwords Now</h2>
            <p className={styles.ctaCardText}>Don't risk being part of the next data breach. Generate strong, unique passwords that protect your accounts from common attacks. Our secure password generator creates complex passwords that are virtually impossible to crack.</p>
            <div className={styles.ctaActions}>
              <Link 
                href="/create-free-username-and-password-with-accessvaulted-generator" 
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              >
                Generate Secure Passwords
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getStaticProps() {
  // Generate dates at build time for SSG
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const lastModifiedDate = now.toISOString(); // Full ISO string

  return {
    props: {
      currentDate,
      lastModifiedDate,
    },
    // Revalidate every 24 hours for incremental static regeneration
    revalidate: 86400,
  };
}

export default WorstPasswords;