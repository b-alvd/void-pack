"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

const ICONS = {
  home: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 9.5 10 3l7 6.5" />
      <path d="M5 8.6V16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.6" />
    </svg>
  ),
  pack: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 2 3 6v8l7 4 7-4V6l-7-4z" />
      <path d="M3 6l7 4 7-4" />
      <path d="M10 10v8" />
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <rect x="2.5" y="6.5" width="10" height="11.5" rx="1.6" />
      <path d="M6.5 6.5V4.4a1.6 1.6 0 0 1 1.6-1.6h7.3A1.6 1.6 0 0 1 17 4.4v9a1.6 1.6 0 0 1-1.6 1.6h-2.9" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.8" />
      <path d="M2.2 17a4.8 4.8 0 0 1 9.6 0" />
      <path d="M13.5 4.6a2.8 2.8 0 0 1 0 5.3" />
      <path d="M14 12.4a4.8 4.8 0 0 1 3.8 4.6" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="10" cy="6.8" r="3.2" />
      <path d="M3.8 17.5a6.2 6.2 0 0 1 12.4 0" />
    </svg>
  ),
};

const ITEMS = [
  { href: "/", label: "Accueil", icon: ICONS.home },
  { href: "/pack", label: "Pack", icon: ICONS.pack },
  { href: "/cards", label: "Cartes", icon: ICONS.cards },
  { href: "/community", label: "Communauté", icon: ICONS.community },
  { href: "/profile", label: "Profil", icon: ICONS.profile },
];

function isActive(href, pathname) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function BottomNav() {
  const pathname = usePathname();
  const activeIndex = ITEMS.findIndex((it) => isActive(it.href, pathname));

  return (
    <nav className={styles.nav}>
      <div className={styles.track}>
        <span
          className={styles.indicator}
          style={{
            width: `calc(100% / ${ITEMS.length})`,
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
            opacity: activeIndex < 0 ? 0 : 1,
          }}
        />
        {ITEMS.map((it, i) => (
          <Link
            key={it.href}
            href={it.href}
            className={`${styles.item} ${i === activeIndex ? styles.active : ""}`}
          >
            <span className={styles.icon}>{it.icon}</span>
            <span className={styles.label}>{it.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
