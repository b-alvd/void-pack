import Link from "next/link";
import { getSession } from "@/src/lib/session";
import LoginButton from "@/components/LoginButton";
import { BOOSTERS } from "@/src/data/boosters";
import styles from "./page.module.css";

export default async function Home() {
  const user = await getSession();

  return (
    <main className={styles.main}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Void Pack</p>
          <h1 className={styles.title}>Ouvre. Révèle. Collectionne.</h1>
          <p className={styles.lead}>
            Entre ton code, ouvre un booster, et découvre quelle carte le Void t'a réservée.
          </p>
          <div className={styles.heroAction}>
            {user ? (
              <Link href="/pack" className={styles.openBtn}>Ouvrir un pack</Link>
            ) : (
              <LoginButton />
            )}
          </div>
        </header>

        <section className={styles.boosters}>
          <h2 className={styles.sectionTitle}>Boosters disponibles</h2>
          <div className={styles.grid}>
            {BOOSTERS.map((b) => (
              <article key={b.id} className={styles.card} style={{ "--accent": b.accent }}>
                <div className={styles.cardGlow} />
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{b.name}</h3>
                  <p className={styles.cardTagline}>{b.tagline}</p>
                  <div className={styles.cardMeta}>
                    <span>{b.cards} cartes</span>
                    <span>{b.rarity}</span>
                  </div>
                </div>
                {b.available ? (
                  <Link href="/pack" className={styles.cardCta}>Ouvrir</Link>
                ) : (
                  <span className={styles.cardSoon}>Bientôt</span>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
