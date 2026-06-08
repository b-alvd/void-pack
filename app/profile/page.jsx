import Link from "next/link";
import { eq } from "drizzle-orm";
import { getSession } from "@/src/lib/session";
import { db } from "@/src/db";
import { userCards } from "@/src/db/schema";
import { RARITIES, getCard } from "@/src/data/boosters";
import EditProfile from "@/components/EditProfile";
import LoginButton from "@/components/LoginButton";
import styles from "./page.module.css";

const RARITY_ORDER = ["commune", "rare", "epique", "legendaire"];

function memberSince(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ProfilePage() {
  const user = await getSession();

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

  const cards = await db.select().from(userCards).where(eq(userCards.userId, user.id));
  const packsOpened = cards.length;

  const owned = new Map();
  for (const c of cards) {
    const e = owned.get(c.cardId) || { count: 0, boosterId: c.boosterId, rarity: c.rarity };
    e.count++;
    owned.set(c.cardId, e);
  }
  const uniqueCount = owned.size;

  let maxRarity = null;
  for (const c of cards) {
    if (maxRarity === null || RARITY_ORDER.indexOf(c.rarity) > RARITY_ORDER.indexOf(maxRarity)) maxRarity = c.rarity;
  }

  const collection = [...owned.entries()].map(([cardId, e]) => {
    const def = getCard(e.boosterId, cardId);
    const rar = RARITIES[e.rarity];
    return {
      cardId,
      name: def?.name ?? cardId,
      count: e.count,
      label: rar?.label ?? e.rarity,
      color: rar?.color ?? "#9ca3af",
    };
  }).sort((a, b) => RARITY_ORDER.indexOf(b.cardId) - RARITY_ORDER.indexOf(a.cardId));

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
          <div className={styles.statValue}>{uniqueCount}</div>
          <div className={styles.statHint}>cartes uniques</div>
        </div>
        <div className={styles.stat} style={{ animationDelay: "0.1s" }}>
          <div className={styles.statLabel}>Packs ouverts</div>
          <div className={styles.statValue}>{packsOpened}</div>
        </div>
        <div className={styles.stat} style={{ animationDelay: "0.15s" }}>
          <div className={styles.statLabel}>Rareté max</div>
          <div className={styles.statValue} style={{ color: maxRarity ? RARITIES[maxRarity].color : undefined }}>
            {maxRarity ? RARITIES[maxRarity].label : "—"}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Ma collection</h2>
          <span className={styles.sectionCount}>{uniqueCount} carte{uniqueCount > 1 ? "s" : ""}</span>
        </div>
        {collection.length > 0 ? (
          <div className={styles.collGrid}>
            {collection.map((c) => (
              <div key={c.cardId} className={styles.collCard} style={{ "--rar": c.color }}>
                {c.count > 1 && <span className={styles.collCount}>×{c.count}</span>}
                <span className={styles.collRarity}>{c.label}</span>
                <span className={styles.collName}>{c.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Tu n'as pas encore ouvert de pack.</p>
            <Link href="/pack" className={styles.cta}>Ouvrir un pack</Link>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        {since && <span className={styles.footerSince}>Membre depuis {since}</span>}
        <a href="/api/auth/logout" className={styles.logout}>Déconnexion</a>
      </footer>
    </main>
  );
}
