'use client';
import Link from 'next/link';
import Head from 'next/head';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Free Username & Password Generator</title>
        <meta 
          name="description" 
          content="The page you're looking for doesn't exist. Return to our homepage to generate strong, secure usernames and passwords instantly." 
        />
        <meta name="robots" content="noindex, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <div className="notFoundPage">
        <main className="notFoundMain">
          <div className="notFoundContainer">
            <div className="notFoundCard">
              
              {/* Header Section */}
              <header className="notFoundHeader">
                <h1 className="notFoundTitle">404 - Page Not Found</h1>
                <p className="notFoundIntro">
                  Oops! The page you're looking for seems to have gone missing. Don't worry, we'll help you get back to generating secure credentials instantly.
                </p>
              </header>

              {/* What Happened Section */}
              <section className="notFoundSection" aria-labelledby="what-happened">
                <h2 id="what-happened" className="sectionTitle">What Might Have Happened?</h2>
                <ul className="featureList" role="list">
                  <li className="featureItem">
                    <span className="checkmark">🔍</span>
                    The page may have been moved or deleted
                  </li>
                  <li className="featureItem">
                    <span className="checkmark">⌨️</span>
                    There might be a typo in the URL
                  </li>
                  <li className="featureItem">
                    <span className="checkmark">🔗</span>
                    The link you followed could be outdated
                  </li>
                  <li className="featureItem">
                    <span className="checkmark">🚧</span>
                    We might be temporarily updating the page
                  </li>
                </ul>
              </section>

              {/* What You Can Do Section */}
              <section className="notFoundSection" aria-labelledby="what-to-do">
                <h2 id="what-to-do" className="sectionTitle">Get Back to Secure Credentials</h2>
                <p className="sectionText">
                  While we fix this, why not generate some strong credentials? Our tool is <strong>100% private</strong> - no data stored, no sign-up required, and everything happens in your browser.
                </p>
                <div className="privacyHighlight">
                  <strong>Your privacy matters: Zero data collection, instant generation</strong>
                </div>
              </section>

              {/* CTA Section */}
              <section className="ctaSection">
                <Link href="/create-free-username-and-password-with-accessvaulted-generator" className="ctaButton">
                  Generate Strong Credentials Now
                </Link>
                <p className="ctaSubtext">
                  Free, private, and instant - create unbreakable login credentials
                </p>
              </section>

            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        /* CSS Variables matching About-us page styling */
        :root {
          --primary-bg: #ffffff;
          --text-primary: #374151;
          --text-secondary: #6b7280;
          --accent-color: #2563eb;
          --accent-hover: #1d4ed8;
          --border-color: #e5e7eb;
          --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Base Styles - Mobile First */
        .notFoundPage {
          background-color: var(--primary-bg);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        .notFoundMain {
          flex: 1;
          display: flex;
          align-items: flex-start; /* Changed from center to flex-start */
          justify-content: center;
          padding: 1rem;
          width: 100%;
          margin-top: 1rem; /* Added top margin to ensure visibility below nav */
        }

        .notFoundContainer {
          width: 100%;
          max-width: 42rem;
          margin: 0 auto;
        }

        .notFoundCard {
          background: var(--primary-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          box-shadow: var(--card-shadow);
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
          margin-top: 1rem; /* Additional margin for the card itself */
        }

        /* Header Styles */
        .notFoundHeader {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .notFoundTitle {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .notFoundIntro {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 36rem;
          margin: 0 auto;
        }

        /* Section Styles */
        .notFoundSection {
          margin-bottom: 2.5rem;
        }

        .sectionTitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .sectionText {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        /* Privacy Highlight */
        .privacyHighlight {
          background-color: #f8fafc;
          border-left: 4px solid var(--accent-color);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          border-radius: 0 0.375rem 0.375rem 0;
          color: var(--text-primary);
        }

        /* Feature List Styles */
        .featureList {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .featureItem {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .checkmark {
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        /* CTA Section */
        .ctaSection {
          text-align: center;
          margin-top: 2.5rem;
        }

        .ctaButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;
          min-height: 3rem;
          min-width: 12rem;
        }

        .ctaButton:hover {
          background-color: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: var(--card-shadow-hover);
        }

        .ctaButton:active {
          transform: translateY(0);
        }

        .ctaSubtext {
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */

        /* Small Phones (320px - 374px) */
        @media (max-width: 374px) {
          .notFoundMain {
            padding: 0.5rem; /* Reduced padding for very small screens */
            margin-top: 0.5rem;
          }

          .notFoundCard {
            padding: 1.25rem; /* Reduced padding */
            border-radius: 0.5rem;
            margin-top: 0.5rem;
          }

          .notFoundTitle {
            font-size: 1.375rem; /* Slightly smaller font for very small screens */
            margin-bottom: 0.75rem;
            padding-top: 0.25rem; /* Added padding to top */
          }

          .notFoundIntro {
            font-size: 0.95rem; /* Slightly smaller intro text */
          }

          .sectionTitle {
            font-size: 1.125rem;
          }

          .ctaButton {
            width: 100%;
            min-width: auto;
            padding: 0.875rem 1rem;
          }

          .privacyHighlight {
            padding: 0.875rem 1rem;
            margin: 1.25rem 0;
          }

          .notFoundHeader {
            margin-bottom: 2rem; /* Reduced margin */
          }

          .notFoundSection {
            margin-bottom: 2rem; /* Reduced margin */
          }
        }

        /* Medium Phones (375px - 424px) */
        @media (min-width: 375px) and (max-width: 424px) {
          .notFoundMain {
            padding: 0.75rem;
            margin-top: 0.75rem;
          }

          .notFoundCard {
            padding: 1.5rem;
            margin-top: 0.75rem;
          }

          .notFoundTitle {
            font-size: 1.5rem;
            padding-top: 0.5rem;
          }
        }

        /* Large Phones (425px - 767px) */
        @media (min-width: 425px) and (max-width: 767px) {
          .notFoundMain {
            padding: 1rem;
            margin-top: 1rem;
          }

          .notFoundCard {
            padding: 1.75rem;
            margin-top: 1rem;
          }

          .notFoundTitle {
            font-size: 1.625rem;
            padding-top: 0.5rem;
          }
        }

        /* Tablets (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .notFoundMain {
            padding: 1.5rem;
            margin-top: 1.5rem;
            align-items: center; /* Back to center on tablets */
          }

          .notFoundCard {
            padding: 2.5rem;
            margin-top: 0;
          }

          .notFoundTitle {
            font-size: 2rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.125rem;
          }

          .sectionTitle {
            font-size: 1.375rem;
          }

          .ctaButton {
            padding: 1rem 2rem;
            font-size: 1.125rem;
            min-height: 3.5rem;
          }
        }

        /* Desktop (1024px - 1439px) */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .notFoundMain {
            padding: 2rem;
            margin-top: 2rem;
            align-items: center;
          }

          .notFoundContainer {
            max-width: 48rem;
          }

          .notFoundCard {
            padding: 3rem;
            margin-top: 0;
          }

          .notFoundTitle {
            font-size: 2.25rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.25rem;
          }
        }

        /* Large Desktop (1440px and above) */
        @media (min-width: 1440px) {
          .notFoundMain {
            padding: 2.5rem;
            margin-top: 2.5rem;
            align-items: center;
          }

          .notFoundContainer {
            max-width: 56rem;
          }

          .notFoundCard {
            padding: 3.5rem;
            margin-top: 0;
          }

          .notFoundTitle {
            font-size: 2.5rem;
            padding-top: 0;
          }

          .notFoundIntro {
            font-size: 1.375rem;
          }

          .sectionTitle {
            font-size: 1.5rem;
          }

          .ctaButton {
            padding: 1.125rem 2.25rem;
            font-size: 1.125rem;
            min-height: 3.75rem;
          }
        }

        /* ===== ACCESSIBILITY & ENHANCEMENTS ===== */

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .ctaButton {
            transition: none;
          }
          
          .ctaButton:hover {
            transform: none;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          :root {
            --primary-bg: #1f2937;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --border-color: #374151;
            --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
            --card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
          }

          .privacyHighlight {
            background-color: #374151;
            border-left-color: var(--accent-color);
          }
        }

        /* High Contrast Support */
        @media (prefers-contrast: high) {
          .ctaButton {
            border: 2px solid currentColor;
          }
          
          .notFoundCard {
            border-width: 2px;
          }

          .privacyHighlight {
            border-width: 3px;
          }
        }

        /* Focus States */
        .ctaButton:focus-visible {
          outline: 2px solid var(--accent-color);
          outline-offset: 2px;
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .ctaButton:hover {
            transform: none;
          }
          
          .ctaButton:active {
            transform: scale(0.98);
          }
        }

        /* Landscape Orientation Optimizations */
        @media (max-height: 500px) and (orientation: landscape) {
          .notFoundMain {
            padding: 0.75rem;
            margin-top: 0.75rem;
            align-items: flex-start;
          }
          
          .notFoundCard {
            padding: 1.25rem;
            margin-top: 0.5rem;
          }
          
          .notFoundHeader {
            margin-bottom: 1.25rem;
          }
          
          .notFoundSection {
            margin-bottom: 1.25rem;
          }

          .notFoundTitle {
            font-size: 1.5rem;
            padding-top: 0.25rem;
          }
        }

        /* Very small height screens */
        @media (max-height: 400px) {
          .notFoundMain {
            align-items: flex-start;
            padding-top: 1rem;
            margin-top: 0.5rem;
          }

          .notFoundCard {
            padding: 1rem;
            margin-top: 0.5rem;
          }

          .notFoundTitle {
            font-size: 1.375rem;
            margin-bottom: 0.5rem;
            padding-top: 0.25rem;
          }

          .notFoundIntro {
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }
        }

        /* Safe area insets for notched devices */
        @supports(padding: max(0px)) {
          .notFoundMain {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
            padding-top: max(1rem, env(safe-area-inset-top));
          }
        }
      `}</style>
    </>
  );
};

export default Custom404;