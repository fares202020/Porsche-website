import styles from "./AuthShell.module.css";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className={styles.page}>
      <main
        className={`${styles.content} d-flex align-items-center justify-content-center px-3 py-5`}
      >
        <section className={styles.card}>
          <div className={styles.cardBody}>
            <header className={styles.header}>
              <p className={styles.eyebrow}>Porsche account</p>
              <h1 className={styles.title}>{title}</h1>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </header>

            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
