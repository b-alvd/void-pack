"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./HudFrame.module.css";

const SECTIONS = [
  { label: "VOID", href: "/" },
  { label: "PACK", href: "/pack" },
  { label: "PROFIL", href: "/profile" },
];

function Crosshair({ position, delay = "0s" }) {
  return (
    <span className={`${styles.crosshair} ${styles[position]}`}>
      <svg className={styles.reticle} style={{ animationDelay: delay }}
        width="26" height="26" viewBox="0 0 26 26"
        fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="13" y1="2" x2="13" y2="24" />
        <line x1="2" y1="13" x2="24" y2="13" />
      </svg>
    </span>
  );
}

function Chevrons({ dir = "down", delay = "0s" }) {
  return (
    <span className={dir === "up" ? styles.chevUp : undefined}>
      <svg className={styles.chev} style={{ animationDelay: delay }}
        width="16" height="20" viewBox="0 0 16 20"
        fill="none" stroke="currentColor" strokeWidth="1.25"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3l6 5 6-5" />
        <path d="M2 11l6 5 6-5" />
      </svg>
    </span>
  );
}

function SideRail({ label, href, side }) {
  return (
    <Link href={href} aria-label={label}
      className={`${styles.rail} ${side === "left" ? styles.left : styles.right}`}>
      <Chevrons dir="down" delay="0s" />
      <span className={styles.line} />
      <div className={styles.label}>
        {label.split("").map((c, i) => (<span key={i}>{c}</span>))}
      </div>
      <span className={styles.line} />
      <Chevrons dir="up" delay="0.4s" />
    </Link>
  );
}

export default function HudFrame() {
  const pathname = usePathname();
  const others = SECTIONS.filter((s) => s.href !== pathname).slice(0, 2);
  const left = others[0];
  const right = others[1];

  return (
    <div className={styles.frame}>
      <div className={styles.corners}>
        <Crosshair position="topLeft" delay="0s" />
        <Crosshair position="topRight" delay="1.2s" />
        <Crosshair position="bottomLeft" delay="2.4s" />
        <Crosshair position="bottomRight" delay="3.6s" />
      </div>
      {left && <SideRail label={left.label} href={left.href} side="left" />}
      {right && <SideRail label={right.label} href={right.href} side="right" />}
    </div>
  );
}
