import styles from "./ComingSoon.module.css";

export default function ComingSoon({ kicker, title, text }) {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        <span className={styles.badge}>Bientôt</span>
      </div>
    </main>
  );
}
