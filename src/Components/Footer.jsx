import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Username & Password Generator', link: '/create-free-username-and-password-with-accessvaulted-generator' },
    { name: 'Security Blog', link: '/blog' },
    { name: 'Contact Us', link: '/contact' }
  ];

  const companyLinks = [
    { name: 'About Us', link: '/about' },
    { name: 'Privacy Policy', link: '/privacy-policy' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', link: '#' },
    { name: 'Facebook', icon: '📘', link: '#' },
    { name: 'LinkedIn', icon: '🔗', link: '#' },
    { name: 'GitHub', icon: '💻', link: '#' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.footerBrand}>
          <h2 className={styles.logo}>Access<span>Vaulted</span></h2>
          <p className={styles.brandDescription}>
            Enterprise-grade cybersecurity solutions for the modern digital world. 
            Protect your digital identity with our advanced security tools.
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className={styles.socialLink}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.socialIcon}>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div className={styles.footerLinks}>
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href={link.link} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linksList}>
              {companyLinks.map((link, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href={link.link} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Security Tools</h3>
            <ul className={styles.linksList}>
              <li className={styles.listItem}>
                <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.footerLink}>
                  Password Generator
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.footerLink}>
                  Username Checker
                </Link>
              </li>
              
              
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} AccessVaulted. All rights reserved.
        </div>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;