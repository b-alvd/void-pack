import styles from "./page.module.css";

export default function PackPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Booster</p>
        <h1 className={styles.title}>Ouverture de pack</h1>
        <p className={styles.sub}>Bientôt : entre ton code, ouvre le booster, révèle ta carte.</p>
      </div>
    </main>
  );
}
