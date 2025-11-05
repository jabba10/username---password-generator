import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(`.${styles.navbarContainer}`)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarBrand}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            Access<span>Vaulted</span>
          </Link>
        </div>
        
        <div className={`${styles.navbarLinks} ${isMenuOpen ? styles.active : ''}`}>
          <div className={styles.menuContent}>
            <Link 
              href="/create-free-username-and-password-with-accessvaulted-generator" 
              className={styles.navLink} 
              onClick={closeMenu}
            >
              <span className={styles.navIcon}>🔐</span>
              Username & Password Generator
            </Link>
            
            <Link href="/blog" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>📝</span>
              Blog
            </Link>
            
            <Link href="/about-us" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>ℹ️</span>
              About
            </Link>
            
            <Link href="/contact-us" className={styles.navLink} onClick={closeMenu}>
              <span className={styles.navIcon}>✉️</span>
              Contact
            </Link>
          </div>
        </div>
        
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay for mobile */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navbar;