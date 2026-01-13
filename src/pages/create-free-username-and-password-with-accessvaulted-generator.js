import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './PasswordGenerator.module.css';

const PasswordGenerator = () => {
  // Username Generator State
  const [fullName, setFullName] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [usernameStrength, setUsernameStrength] = useState(0);
  const [usernameCopied, setUsernameCopied] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  // Password Generator State
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);

  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Generate Username
  const generateUsername = () => {
    if (!fullName.trim()) {
      setIsNameError(true);
      return;
    }

    setIsNameError(false);
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';

    let username = '';
    const randomNum = Math.floor(Math.random() * 900) + 100;

    if (lastName) {
      username = `${firstName}${lastName.charAt(0)}${randomNum}`;
    } else {
      username = `${firstName.slice(0, 6)}_${randomNum}`;
    }

    const symbols = '_.-';
    if (Math.random() > 0.7) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      username = username.slice(0, -3) + sym + username.slice(-3);
    }

    setGeneratedUsername(username);
    checkUsernameStrength(username);
    setUsernameCopied(false);
  };

  // Check Username Strength
  const checkUsernameStrength = (uname) => {
    let score = 0;
    if (uname.length >= 6) score += 20;
    if (uname.length >= 8) score += 20;
    if (/\d/.test(uname)) score += 25;
    if (/[_.-]/.test(uname)) score += 25;
    if (/[a-z]/.test(uname) && /[A-Z]/.test(uname)) score += 10;
    setUsernameStrength(Math.min(score, 100));
  };

  // Generate Password
  const generatePassword = () => {
    let chars = '';
    let generatedPassword = '';

    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    if (!chars) {
      alert('Please select at least one character type');
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    checkPasswordStrength(generatedPassword);
    setPasswordCopied(false);
    setIsManualEdit(false);
  };

  // Check Password Strength
  const checkPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score += 10;
    if (pwd.length >= 8) score += 15;
    if (pwd.length >= 10) score += 15;
    if (pwd.length >= 12) score += 10;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    const typesCount = [
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd),
    ].filter(Boolean).length;

    if (typesCount >= 3) score += 10;
    if (typesCount === 4) score += 15;

    setPasswordStrength(Math.min(score, 100));
  };

  // Manual password edit
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    setIsManualEdit(true);
    setPasswordCopied(false);
  };

  // Copy functions
  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'username') {
      setUsernameCopied(true);
      setTimeout(() => setUsernameCopied(false), 2000);
    } else {
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  // Strength colors
  const getStrengthColor = (strength) => {
    if (strength < 40) return '#ff4d4d';
    if (strength < 70) return '#ffcc00';
    if (strength < 85) return '#66cc33';
    return '#2d862d';
  };

  const getStrengthLabel = (strength) => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Moderate';
    if (strength < 85) return 'Strong';
    return 'Very Strong';
  };

  // Initial generation
  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <>
      <Head>
        <title>Free Secure Password & Username Generator | AccessVaulted</title>
        <meta
          name="description"
          content="Generate strong, secure usernames and passwords instantly. 100% free, private, and designed for maximum online protection."
        />
        <meta
          name="keywords"
          content="secure password generator, free username generator, strong password maker, password strength checker, cybersecurity tool, random password, secure login"
        />
        <meta name="author" content="AccessVaulted" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.accessvaulted.com/generator" />

        <meta property="og:title" content="Free Secure Password & Username Generator | AccessVaulted" />
        <meta
          property="og:description"
          content="Create unbreakable passwords and cyber-safe usernames in seconds. Free, fast, and fully private."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.accessvaulted.com/generator" />
        <meta property="og:image" content="https://www.accessvaulted.com/images/password-generator-preview.jpg" />
        <meta property="og:site_name" content="AccessVaulted" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Secure Password & Username Generator | AccessVaulted" />
        <meta
          name="twitter:description"
          content="Generate strong, unique passwords and usernames with built-in strength analysis. 100% private and free to use."
        />
        <meta name="twitter:image" content="https://www.accessvaulted.com/images/password-generator-preview.jpg" />
        <meta name="twitter:site" content="@accessvaulted" />
        <meta name="twitter:creator" content="@accessvaulted" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Secure Password & Username Generator",
                "url": "https://www.accessvaulted.com/create-free-username-and-password-with-accessvaulted-generator",
                "description": "Free online tool to generate strong passwords and secure usernames. Includes real-time strength analysis and security scoring.",
                "publisher": {
                  "@type": "Organization",
                  "name": "AccessVaulted",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.accessvaulted.com/images/logo.png"
                  }
                }
              }
            ])
          }}
        />
      </Head>

      <div className={styles.generatorContainer}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Secure Username & Password Generator</h1>
          <p className={styles.pageSubtitle}>
            Create strong, unique usernames and passwords in seconds. Perfect for cybersecurity, account protection, and safe online identity.
          </p>
        </header>

        <div className={styles.mainCardsLayout}>
          <div className={styles.generatorCard}>
            <h2>Username Generator</h2>
            <p className={styles.cardSubtitle}>Enter your name to create a secure, cyber-safe username</p>

            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.formLabel}>Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (e.target.value.trim()) setIsNameError(false);
                }}
                placeholder="Enter your full name"
                className={styles.textInput}
              />
              {isNameError && <p className={styles.errorText}>Full name is required.</p>}
            </div>

            <button onClick={generateUsername} className={styles.generateBtn}>
              Generate Username
            </button>

            {generatedUsername && (
              <div className={styles.outputContainer}>
                <div className={styles.outputRow}>
                  <code className={styles.usernameOutput}>{generatedUsername}</code>
                  <button
                    onClick={() => copyToClipboard(generatedUsername, 'username')}
                    className={`${styles.copyBtn} ${usernameCopied ? styles.copied : ''}`}
                  >
                    {usernameCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className={styles.strengthIndicator}>
                  <div className={styles.strengthHeader}>
                    <span className={styles.strengthLabel}>Username Strength:</span>
                    <strong
                      className={styles.strengthValue}
                      style={{ color: getStrengthColor(usernameStrength) }}
                    >
                      {getStrengthLabel(usernameStrength)} ({usernameStrength}%)
                    </strong>
                  </div>
                  <div className={styles.strengthBarContainer}>
                    <div
                      className={styles.strengthBar}
                      style={{
                        width: `${usernameStrength}%`,
                        backgroundColor: getStrengthColor(usernameStrength),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.generatorCard}>
            <h2>Secure Password Generator</h2>
            <p className={styles.cardSubtitle}>Create or check the strength of your passwords</p>

            <div className={styles.passwordDisplay}>
              <input
                type="text"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Type or generate a password"
                className={styles.passwordOutput}
              />
              <button
                onClick={() => copyToClipboard(password, 'password')}
                className={`${styles.copyBtn} ${password ? styles.active : ''} ${passwordCopied ? styles.copied : ''}`}
                disabled={!password}
              >
                {passwordCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className={styles.strengthIndicator}>
              <div className={styles.strengthHeader}>
                <span className={styles.strengthLabel}>Password Strength:</span>
                <strong
                  className={styles.strengthValue}
                  style={{ color: getStrengthColor(passwordStrength) }}
                >
                  {getStrengthLabel(passwordStrength)} ({passwordStrength}%)
                </strong>
              </div>
              <div className={styles.strengthBarContainer}>
                <div
                  className={styles.strengthBar}
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor: getStrengthColor(passwordStrength),
                  }}
                ></div>
              </div>
            </div>

            <div className={styles.controlsSection}>
              <div className={styles.controlGroup}>
                <label className={styles.sliderLabel}>
                  Password Length: <strong>{length}</strong>
                </label>
                <input
                  type="range"
                  min="6"
                  max="12"
                  value={length}
                  onChange={(e) => {
                    setLength(parseInt(e.target.value));
                    if (!isManualEdit) generatePassword();
                  }}
                  className={styles.lengthSlider}
                />
                <div className={styles.lengthValues}>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                  <span>12</span>
                </div>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={() => {
                      setIncludeUppercase(!includeUppercase);
                      if (!isManualEdit) generatePassword();
                    }}
                  />
                  <span className={styles.checkmark}></span>
                  Include Uppercase Letters (A-Z)
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={() => {
                      setIncludeLowercase(!includeLowercase);
                      if (!isManualEdit) generatePassword();
                    }}
                  />
                  <span className={styles.checkmark}></span>
                  Include Lowercase Letters (a-z)
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => {
                      setIncludeNumbers(!includeNumbers);
                      if (!isManualEdit) generatePassword();
                    }}
                  />
                  <span className={styles.checkmark}></span>
                  Include Numbers (0-9)
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={() => {
                      setIncludeSymbols(!includeSymbols);
                      if (!isManualEdit) generatePassword();
                    }}
                  />
                  <span className={styles.checkmark}></span>
                  Include Symbols (!@#$% etc.)
                </label>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button onClick={generatePassword} className={styles.generateBtn}>
                Generate New Password
              </button>
              <button
                onClick={() => {
                  setPassword('');
                  setIsManualEdit(true);
                }}
                className={styles.clearBtn}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className={styles.testerCard}>
          <h3>Security Strength Tester</h3>
          <p>Test the strength of your username and password together.</p>

          <div className={styles.testerInputs}>
            <div className={styles.testerField}>
              <label className={styles.formLabel}>Username</label>
              <div className={styles.outputRow}>
                <input
                  type="text"
                  value={generatedUsername}
                  readOnly
                  placeholder="Generated username"
                  className={styles.testerInput}
                />
                <button
                  onClick={() => copyToClipboard(generatedUsername, 'username')}
                  className={styles.copyBtn}
                  disabled={!generatedUsername}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className={styles.testerField}>
              <label className={styles.formLabel}>Password</label>
              <div className={styles.outputRow}>
                <input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Generated password"
                  className={styles.testerInput}
                />
                <button
                  onClick={() => copyToClipboard(password, 'password')}
                  className={styles.copyBtn}
                  disabled={!password}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className={styles.overallStrength}>
            <h4>Overall Security Score</h4>
            <div className={styles.strengthHeader}>
              <span className={styles.strengthLabel}>Combined Strength:</span>
              <strong
                className={styles.strengthValue}
                style={{
                  color: getStrengthColor((usernameStrength + passwordStrength) / 2),
                }}
              >
                {getStrengthLabel((usernameStrength + passwordStrength) / 2)}{' '}
                ({Math.round((usernameStrength + passwordStrength) / 2)}%)
              </strong>
            </div>
            <div className={styles.strengthBarContainer}>
              <div
                className={styles.strengthBar}
                style={{
                  width: `${(usernameStrength + passwordStrength) / 2}%`,
                  backgroundColor: getStrengthColor((usernameStrength + passwordStrength) / 2),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;