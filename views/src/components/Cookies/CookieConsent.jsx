import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieConsent.module.css";

const CONSENT_KEY = "cookie-consent";
const CONSENT_ACCEPTED = "accepted";
const CONSENT_REJECTED = "rejected";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const storedConsent = window.localStorage.getItem(CONSENT_KEY);
      return !storedConsent;
    } catch {
      return true;
    }
  });

  const setConsent = (value) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // If storage is unavailable, still dismiss the banner for this session.
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.bannerWrapper} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className={styles.banner}>
        <div className={styles.copy}>
          <p className={styles.title}>Cookies and similar technologies</p>
          <p className={styles.description}>
            We use cookies to keep the site running smoothly, remember preferences, and understand
            how visitors use the app. You can accept all cookies or reject non-essential ones.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/privacy-policy" className={styles.learnMore}>
            Learn more
          </Link>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.secondaryButton}`}
            onClick={() => setConsent(CONSENT_REJECTED)}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.primaryButton}`}
            onClick={() => setConsent(CONSENT_ACCEPTED)}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
