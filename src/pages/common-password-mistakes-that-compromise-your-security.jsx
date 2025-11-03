import React from 'react';
import Link from 'next/link';
import styles from './strongpassword.module.css';

const CommonPassword = () => {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleCard}>
        <h1 className={styles.articleTitle}>Common Password Mistakes That Compromise Your Security</h1>
        
        

        <p className={styles.articleSubtitle}>
          Avoid these frequent password pitfalls that leave users vulnerable to attacks.
        </p>

        <div className={styles.articleContent}>
          <h2>Common Password Mistakes You Should Avoid</h2>
          <ol>
            <li><strong>Using Personal Info:</strong> Birthdays, pet names, or favorite sports teams are easy for attackers to find on social media.</li>
            <li><strong>Writing Passwords Down:</strong> Sticky notes or unencrypted files are physical security risks.</li>
            <li><strong>Ignoring MFA:</strong> Even a strong password can be phished. MFA adds a second layer of protection.</li>
            <li><strong>Reusing Passwords:</strong> One breach = all accounts compromised.</li>
            <li><strong>Not Updating After Breaches:</strong> Check if your email was in a breach via <em>Have I Been Pwned</em>.</li>
            <li><strong>Using Common Passwords:</strong> "123456", "password", and "qwerty" are always the first ones hackers try.</li>
            <li><strong>Sharing Passwords Insecurely:</strong> Sending logins via email or text message leaves a vulnerable paper trail.</li>
            <li><strong>Using Short Passwords:</strong> Anything under 12 characters is dangerously weak against modern computing power.</li>
            <li><strong>Using Predictable Patterns:</strong> "ABC123", "aaabbb", and keyboard walks like "!QAZ2wsx" are easily cracked.</li>
            <li><strong>Ignoring Password Strength Meters:</strong> Dismissing warnings about weak passwords during account creation.</li>
            <li><strong>Using Dictionary Words:</strong> Any single word, even a long one, is vulnerable to dictionary attacks.</li>
            <li><strong>Not Using a Password Manager:</strong> Relying on memory leads to simple, reused passwords.</li>
            <li><strong>Using the Same Security Questions:</strong> Answers like your mother's maiden name are often publicly discoverable.</li>
            <li><strong>Storing Passwords in Browsers:</strong> While convenient, built-in browser managers are often less secure than dedicated ones.</li>
            <li><strong>Assuming You're Not a Target:</strong> Everyone has data worth stealing, from email access to loyalty points.</li>
            <li><strong>Changing Passwords Too Frequently:</strong> This can lead to weaker, incremental passwords (e.g., Password1, Password2).</li>
            <li><strong>Using Public Wi-Fi Without a VPN:</strong> Transmitting passwords over unsecured networks risks interception.</li>
            <li><strong>Clicking "Remember Me" on Public Devices:</strong> This can leave your account permanently logged in.</li>
            <li><strong>Not Logging Out of Sessions:</strong> Leaving accounts open on shared or stolen devices.</li>
            <li><strong>Falling for Phishing Scams:</strong> Entering your password on a fraudulent login page.</li>
            <li><strong>Using Work Passwords for Personal Accounts:</strong> This can give employers access to your private data.</li>
            <li><strong>Not Using Special Characters:</strong> Limiting your character set makes passwords easier to crack.</li>
            <li><strong>Creating passwords based on the website name:</strong> Using "Facebook123" for your Facebook account.</li>
            <li><strong>Using Default Passwords:</strong> Never keeping the default password provided on a new router or device.</li>
            <li><strong>Not Monitoring Account Activity:</strong> Failing to check login histories for unauthorized access.</li>
            <li><strong>Using Identifiable Usernames:</strong> An email address is often your username and is easy to find; use a unique one where possible.</li>
            <li><strong>Disabling Security Notifications:</strong> Turning off alerts for new logins or password changes.</li>
            <li><strong>Creating a Complex Master Password You'll Forget:</strong> Locking yourself out of your password manager vault.</li>
            <li><strong>Not Having a Recovery Plan:</strong> No way to access accounts if you lose your master password or 2FA device.</li>
            <li><strong>Using Passwords at All When Possible:</strong> Forgetting to use stronger WebAuthn/Passkeys where available.</li>
            <li><strong>Not Using a Password Generator:</strong> Manually creating passwords leads to predictable human patterns.</li>
            <li><strong>Trusting Third-Party Apps:</strong> Granting account access to unvetted applications that may be malicious.</li>
            <li><strong>Keeping Old, Unused Accounts Active:</strong> These can be forgotten and become low-hanging fruit for attackers.</li>
            <li><strong>Using Number Sequences:</strong> "123" or "2024" at the end of a password offers little real security.</li>
          </ol>

          <p>Security is a habit — not a one-time setup.</p>

          <div className={styles.articleCta}>
            <Link href="/create-free-username-and-password-with-accessvaulted-generator" className={styles.generateBtn}>
              Generate Secure Passwords
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPassword;