import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Models",
    links: [
      { label: "SUV", href: "/shop/suv" },
      { label: "Sports", href: "/shop/sports" },
      { label: "Electric", href: "/shop/electric" },
      { label: "Sedan", href: "/shop/sedan" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/porsche",
    icon: "fa-brands fa-linkedin-in",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/Porsche",
    icon: "fa-brands fa-youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/porsche",
    icon: "fa-brands fa-instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/porsche",
    icon: "fa-brands fa-facebook-f",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brandColumn}>
          <a className={styles.brand} href="/">
            Porsche
          </a>
          <p className={styles.description}>
            Precision performance, timeless design, and carefully selected
            models for drivers who expect more from every journey.
          </p>

          <div className={styles.contactBlock}>
            <span className={styles.contactItem}>
              <i className="fa-solid fa-location-dot"></i>
              Cairo, Egypt
            </span>
            <a className={styles.contactItem} href="mailto:support@porsche.com">
              <i className="fa-solid fa-envelope"></i>
              support@porsche.com
            </a>
          </div>
        </div>

        <nav className={styles.linksGrid} aria-label="Footer navigation">
          {footerSections.map((section) => (
            <div className={styles.linkGroup} key={section.title}>
              <h2>{section.title}</h2>
              {section.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.connectColumn}>
          <h2>Connect</h2>
          <p>
            Follow official Porsche channels for model updates, motorsport
            stories, and design inspiration.
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 Porsche. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <a href="mailto:support@porsche.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
