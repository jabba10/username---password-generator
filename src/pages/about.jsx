import React from 'react';
import Link from 'next/link';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutCard}>
        <h1 className={styles.aboutTitle}>About Our Free Username & Password Generator</h1>
        <p className={styles.aboutSubtitle}>
          Generate unbreakable login credentials instantly — 100% free, secure, and private.
        </p>

        <div className={styles.aboutContent}>
          <p>
            In today's digital world, weak login credentials are one of the leading causes of data breaches and account takeovers. 
            That's why we built this <strong>free, powerful tool</strong> to help you create strong, unique usernames and passwords in seconds — 
            so you can protect your email, social media, and all other online accounts.
          </p>

          <h3>🔐 Why Strong Credentials Matter</h3>
          <p>
            Reusing simple passwords or predictable usernames puts your identity at risk. Hackers use automated tools to guess common combinations. 
            Our generator creates <strong>random, complex, and cyber-secure credentials</strong> that are nearly impossible to crack.
          </p>

          <h3>✅ How It Works</h3>
          <ul className={styles.aboutList}>
            <li><strong>Enter Your Name:</strong> We generate a unique username using your name with added randomness and symbols.</li>
            <li><strong>Customize Password:</strong> Choose length and character types (uppercase, numbers, symbols) for maximum strength.</li>
            <li><strong>One-Click Generate:</strong> Instantly create and copy your credentials — no delays, no signup.</li>
          </ul>

          <h3>🛡️ Privacy & Security First</h3>
          <p>
            We take your privacy seriously:
          </p>
          <ul className={styles.aboutList}>
            <li>🚫 <strong>No Data Stored:</strong> Everything happens in your browser — we never save or track your credentials.</li>
            <li>🌐 <strong>Works Offline:</strong> Once loaded, the tool runs entirely on your device.</li>
            <li>🔢 <strong>Randomized Output:</strong> Uses JavaScript's secure randomization to prevent prediction.</li>
            <li>🔒 <strong>No Trackers:</strong> Clean, safe, and focused on your security.</li>
          </ul>

          <h3>💡 Perfect For</h3>
          <p>
            Creating secure logins for email, social media, gaming, work accounts, and more. Whether you're a student, professional, or casual user, 
            our tool helps you stay protected online — <strong>for free, forever</strong>.
          </p>

          <div className={styles.aboutCta}>
            <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.generateBtn}>
              Generate Strong Credentials Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;