import React from 'react';
import Link from 'next/link';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.privacyCard}>
        <h1 className={styles.privacyTitle}>Privacy Policy</h1>
        <p className={styles.privacySubtitle}>
          Your privacy is our top priority. We do not collect, store, or share your data.
        </p>

        <div className={styles.privacyContent}>
          <p>
            At <strong>AccessVaulted</strong>, we are committed to protecting your privacy and ensuring your online security. 
            This Privacy Policy explains how we handle your information — and the truth is, <strong>we don't collect any of it</strong>.
          </p>

          <h3>🔐 No Data Collection</h3>
          <p>
            Our tool runs entirely in your browser. When you generate a username or password, everything happens locally on your device. 
            We <strong>do not collect, store, log, or transmit</strong> any input, generated credentials, or personal information.
          </p>

          <h3>🌐 No Server-Side Processing</h3>
          <p>
            Unlike many online tools, our generator does <strong>not send your data to any server</strong>. 
            All generation and strength analysis happens 100% client-side using JavaScript. 
            You can even use this tool offline after the page loads.
          </p>

          <h3>🚫 No Tracking or Analytics</h3>
          <p>
            We do not use cookies, Google Analytics, Facebook Pixel, or any third-party tracking scripts. 
            Your visit is anonymous, and your activity is never monitored.
          </p>

          <h3>💡 How We Keep You Safe</h3>
          <ul className={styles.privacyList}>
            <li><strong>Client-Side Only:</strong> All code runs in your browser — no backend, no database.</li>
            <li><strong>No Input Required:</strong> Even your name (for username generation) is not saved.</li>
            <li><strong>Open & Transparent:</strong> You can inspect the code in your browser's developer tools.</li>
          </ul>

          <h3>🔒 Security of Generated Credentials</h3>
          <p>
            While we generate strong usernames and passwords using randomized logic, it is your responsibility to:
          </p>
          <ul className={styles.privacyList}>
            <li>Store your credentials securely (e.g., in a trusted password manager).</li>
            <li>Not share them publicly.</li>
            <li>Use unique credentials for each account.</li>
          </ul>

          <h3>📜 Changes to This Policy</h3>
          <p>
            This Privacy Policy may be updated from time to time to reflect best practices. 
            Any changes will be posted on this page with an updated revision date.
          </p>

          <div className={styles.privacyCta}>
            <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.generateBtn}>
              Back to Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;