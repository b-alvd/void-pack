import { getSession } from "@/src/lib/session";
import LoginButton from "@/components/LoginButton";
import PackOpener from "@/components/PackOpener";
import styles from "./page.module.css";

export default async function PackPage() {
  const user = await getSession();

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Booster</p>
        <h1 className={styles.title}>Ouverture de pack</h1>
        <p className={styles.sub}>Entre ton code, ouvre le booster, révèle ta carte.</p>
        {user ? (
          <PackOpener />
        ) : (
          <div className={styles.gate}>
            <p className={styles.gateText}>Connecte-toi pour ouvrir un pack.</p>
            <LoginButton />
          </div>
        )}
      </div>
    </main>
  );
}
