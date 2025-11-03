import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './BlogPage.module.css';

const articles = [
  {
    id: 1,
    title: "The Importance of Strong Passwords in Cybersecurity",
    excerpt: "Learn why strong passwords are your first line of defense against cyber threats and how to create them.",
    tags: ["Passwords", "Security Basics"],
    href: "the-importance-of-strong-passwords-in-cybersecurity"
  },
  {
    id: 2,
    title: "Password Strength: What Makes a Password Truly Secure?",
    excerpt: "Discover the key elements that contribute to password strength and how to test your own passwords.",
    
    tags: ["Password Strength", "Testing"],
    href: "password-strength-what-makes-a-password-truly-secure"
  },
  {
    id: 3,
    title: "Password Managers vs. Manual Creation: Which is Better?",
    excerpt: "Compare the pros and cons of using password managers versus creating and remembering passwords manually.",
   
    tags: ["Password Managers", "Best Practices"],
    href: "password-managers-vs-manual-creation-which-is-better"
  },
  {
    id: 4,
    title: "Common Password Mistakes That Compromise Your Security",
    excerpt: "Avoid these frequent password pitfalls that leave users vulnerable to attacks.",
   
    tags: ["Mistakes", "Security Risks"],
    href: "common-password-mistakes-that-compromise-your-security"
  },
  {
    id: 5,
    title: "Multi-Factor Authentication: The Perfect Companion to Strong Passwords",
    excerpt: "How combining MFA with strong passwords creates an almost impenetrable security layer.",
    
    tags: ["MFA", "Enhanced Security"],
    href: "multi-factor-authentication-the-perfect-companion-to-strong-passwords"
  },
  {
    id: 6,
    title: "The Future of Passwords: Biometrics and Beyond",
    excerpt: "Explore emerging technologies that may replace traditional passwords in the coming years.",
    
    tags: ["Future Tech", "Biometrics"],
    href: "the-future-of-passwords-biometrics-and-beyond"
  },
];

const BlogPage = () => {
  const siteUrl = "https://www.accessvaulted.com";
  const pageUrl = `${siteUrl}/blog`;

  return (
    <>
      <Head>
        <title>Cybersecurity Blog | Password Security Tips & Best Practices</title>
        <meta
          name="description"
          content="Expert cybersecurity blog covering password strength, MFA, password managers, and future authentication trends. Stay secure online."
        />
        <meta
          name="keywords"
          content="password security, cybersecurity blog, strong passwords, MFA, password managers, biometrics, online safety"
        />
        <meta name="author" content="AccessVaulted Security Team" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content="Cybersecurity Blog | Password Security Tips & Best Practices" />
        <meta
          property="og:description"
          content="Expert insights on password hygiene, MFA, and future authentication. Learn how to protect your digital identity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteUrl}/images/blog-preview.jpg`} />
        <meta property="og:site_name" content="AccessVaulted" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cybersecurity Blog | Password Security Tips & Best Practices" />
        <meta
          name="twitter:description"
          content="Stay ahead of cyber threats with actionable tips on passwords, MFA, and secure identity management."
        />
        <meta name="twitter:image" content={`${siteUrl}/images/blog-preview.jpg`} />
        <meta name="twitter:site" content="@accessvaulted" />
        <meta name="twitter:creator" content="@accessvaulted" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "AccessVaulted Cybersecurity Blog",
                "url": pageUrl,
                "description": "A trusted source for password security, multi-factor authentication, and digital identity protection advice.",
                "publisher": {
                  "@type": "Organization",
                  "name": "AccessVaulted",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/images/logo.png`
                  }
                },
                "blogPost": articles.map(article => ({
                  "@type": "BlogPosting",
                  "headline": article.title,
                  "description": article.excerpt,
                  "datePublished": article.date,
                  "url": `${siteUrl}${article.href}`,
                  "author": {
                    "@type": "Organization",
                    "name": "AccessVaulted Security Team"
                  }
                }))
              }
            ])
          }}
        />
      </Head>

      <div className={styles.blogContainer}>
        <div className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>Cybersecurity Blog</h1>
          <p className={styles.blogSubtitle}>Expert insights on password security and protection strategies</p>
          <div className={styles.ctaButtons}>
            <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.primaryBtn}>
              Generate Username & Secure Password
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              Learn About Us
            </Link>
          </div>
        </div>

        <div className={styles.featuredArticle}>
          <div className={styles.featuredBadge}>Featured</div>
          <h2 className={styles.featuredTitle}>Mastering Password Security in 2025</h2>
          <p className={styles.articleExcerpt}>
            In today's digital landscape, password security is more critical than ever. 
            This comprehensive guide covers everything from creating uncrackable passwords 
            to implementing proper password hygiene across all your accounts.
          </p>
          <div className={styles.featuredActions}>
            
            <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.generateBtn}>
              Try Our Generator
            </Link>
          </div>
        </div>

        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <article className={styles.articleCard} key={article.id}>
              <div className={styles.articleHeader}>
                <span className={styles.articleDate}>{article.date}</span>
                <div className={styles.tags}>
                  {article.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
              <div className={styles.articleActions}>
                <Link href={article.href} className={styles.readMoreBtn}>
                  Read More
                </Link>
                <Link 
                  href="/create-free-username-and-password-with-accessvaulted-generator" 
                  className={styles.quickLink}
                >
                  Generate Password
                </Link>
              </div>
            </article>
          ))}
        </div>

        
      </div>
    </>
  );
};

export default BlogPage;