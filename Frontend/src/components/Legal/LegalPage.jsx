import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./LegalPage.module.css";

export default function LegalPage({
  title,
  intro,
  updatedOn,
  summaryTitle,
  summaryItems,
  sections,
  relatedLabel,
  relatedTo,
  relatedText,
}) {
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <main className={styles.content}>
          <div className={styles.container}>
            <section className={styles.hero}>
              <div className={styles.heroBody}>
                <p className={styles.eyebrow}>Legal</p>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.intro}>{intro}</p>

                <div className={styles.metaRow}>
                  <span className={styles.metaPill}>Last updated: {updatedOn}</span>
                  <Link className={styles.metaLink} to={relatedTo}>
                    {relatedLabel}
                  </Link>
                  <Link className={styles.metaLink} to="/">
                    Back to home
                  </Link>
                </div>
              </div>

              <aside className={styles.summaryCard} aria-label={`${title} summary`}>
                <h2 className={styles.summaryTitle}>{summaryTitle}</h2>
                <ul className={styles.summaryList}>
                  {summaryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </section>

            <section className={styles.document}>
              {sections.map((section) => (
                <section className={styles.section} key={section.title}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p className={styles.sectionText} key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className={styles.sectionList}>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className={styles.footerNote}>
                <p>{relatedText}</p>
                <Link className={styles.footerLink} to={relatedTo}>
                  {relatedLabel}
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
