import Link from "next/link";
import { getSession } from "@/src/lib/session";
import EditProfile from "@/components/EditProfile";
import LoginButton from "@/components/LoginButton";
import styles from "./page.module.css";

function memberSince(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ProfilePage() {
  const user = await getSession();

  // Pas connecté : on propose la connexion au lieu de rediriger
  if (!user) {
    return (
      <main className={styles.gate}>
        <div className={styles.gateInner}>
          <h1 className={styles.gateTitle}>Ton profil t'attend</h1>
          <p className={styles.gateText}>Connecte-toi avec Discord pour accéder à ton profil et ta collection.</p>
          <LoginButton />
        </div>
      </main>
    );
  }

  const level = user.level ?? 1;
  const xp = user.xp ?? 0;
  const xpMax = 100;
  const xpPct = Math.min(100, Math.round((xp / xpMax) * 100));
  const initial = (user.displayName || user.username || "?").charAt(0).toUpperCase();
  const since = memberSince(user.createdAt);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          {user.avatar ? (
            <img src={user.avatar} alt="" className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{initial}</div>
          )}
          <div className={styles.identity}>
            <h1 className={styles.name}>{user.displayName || user.username}</h1>
            <p className={styles.handle}>@{user.username}</p>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
          </div>
          <EditProfile displayName={user.displayName ?? ""} bio={user.bio ?? ""} />
        </div>

        <div className={styles.levelRow}>
          <span className={styles.levelBadge}>Niveau {level}</span>
          <span className={styles.xpText}>{xp} / {xpMax} XP</span>
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${xpPct}%` }} />
        </div>
      </section>

      <div className={styles.stats}>
        <div className={styles.stat} style={{ animationDelay: "0.05s" }}>
          <div className={styles.statLabel}>Collection</div>
          <div className={styles.statValue}>0</div>
          <div className={styles.statHint}>cartes</div>
        </div>
        <div className={styles.stat} style={{ animationDelay: "0.1s" }}>
          <div className={styles.statLabel}>Packs ouverts</div>
          <div className={styles.statValue}>0</div>
        </div>
        <div className={styles.stat} style={{ animationDelay: "0.15s" }}>
          <div className={styles.statLabel}>Rareté max</div>
          <div className={styles.statValue}>—</div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Ma collection</h2>
          <span className={styles.sectionCount}>0 carte</span>
        </div>
        <div className={styles.empty}>
          <p className={styles.emptyText}>Tu n'as pas encore ouvert de pack.</p>
          <Link href="/" className={styles.cta}>Ouvrir un pack</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        {since && <span className={styles.footerSince}>Membre depuis {since}</span>}
        <a href="/api/auth/logout" className={styles.logout}>Déconnexion</a>
      </footer>
    </main>
  );
}
