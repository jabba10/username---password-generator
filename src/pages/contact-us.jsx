import React, { useState } from 'react';
import Head from 'next/head';
import styles from './contact-us.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/your-email@domain.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success === 'true') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO & Metadata */}
      <Head>
        <title>Contact Us | AccessVaulted - Get in Touch</title>
        <meta
          name="description"
          content="Have questions about our password generator? Contact the AccessVaulted team. We're here to help you with all your security needs."
        />
        <meta
          name="keywords"
          content="contact AccessVaulted, password generator support, security tool help, customer service"
        />
        <meta name="author" content="AccessVaulted" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | AccessVaulted - Get in Touch" />
        <meta
          property="og:description"
          content="Get in touch with the AccessVaulted team for support, questions, or feedback about our free password and username generator."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.accessvaulted.com/contact" />
        <meta property="og:image" content="https://www.accessvaulted.com/images/contact-preview.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | AccessVaulted - Get in Touch" />
        <meta
          name="twitter:description"
          content="Contact our team for support with our free password generator and security tools."
        />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/contact-preview.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.accessvaulted.com/contact" />
      </Head>

      {/* Main Content */}
      <div className={styles.contactContainer}>
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get in Touch</h1>
            <p className={styles.heroSubtitle}>
              Have questions about our password generator? We're here to help you with all your security needs.
            </p>
          </div>
        </header>

        {/* Contact Form & Info Section */}
        <section className={styles.contactSection}>
          <div className={styles.sectionHeader}>
            <h2>Contact Our Team</h2>
            <p className={styles.sectionSubtitle}>
              Send us a message and we'll get back to you as soon as possible
            </p>
          </div>

          <div className={styles.contactContent}>
            {/* Contact Form Card */}
            <div className={styles.contactFormCard}>
              <div className={styles.formHeader}>
                <h3>Send us a Message</h3>
                <p>Fill out the form below and we'll respond within 24 hours</p>
              </div>

              <form 
                onSubmit={handleSubmit}
                className={styles.contactForm}
                action="https://formsubmit.co/your-email@domain.com"
                method="POST"
              >
                {/* Add FormSubmit hidden fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Contact Form Submission from AccessVaulted" />
                <input type="hidden" name="_template" value="table" />
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Security Concern">Security Concern</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.formTextarea}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    ❌ There was an error sending your message. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Card */}
            
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Quick answers to common questions about our service
            </p>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h4>Is the password generator really free?</h4>
              <p>Yes, our username and password generator is completely free to use with no hidden costs or limitations.</p>
            </div>

            <div className={styles.faqCard}>
              <h4>How do you protect my privacy?</h4>
              <p>All password generation happens locally in your browser. We never store or transmit your generated credentials.</p>
            </div>

            <div className={styles.faqCard}>
              <h4>Can I use this for business accounts?</h4>
              <p>Absolutely! Our tool is perfect for generating secure credentials for both personal and business use.</p>
            </div>

            <div className={styles.faqCard}>
              <h4>Do you offer technical support?</h4>
              <p>Yes, we provide free technical support for all users. Contact us through this form for assistance.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Generate Secure Passwords?</h2>
            <p>While you're here, why not try our free password generator? Create strong, unique passwords in seconds.</p>
            <div className={styles.ctaActions}>
              <a 
                href="/create-free-username-and-password-with-accessvaulted-generator" 
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
              >
                Generate Passwords Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;