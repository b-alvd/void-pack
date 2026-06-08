"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { openPack } from "@/app/actions";
import styles from "./PackOpener.module.css";

export default function PackOpener() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function open() {
    if (!code.trim()) return;
    setError("");
    startTransition(async () => {
      const res = await openPack(code);
      if (res.error) { setError(res.error); return; }
      setResult(res);
      router.refresh();
    });
  }

  function reset() { setResult(null); setCode(""); setError(""); }

  if (result) {
    const { card, booster } = result;
    return (
      <div className={styles.reveal}>
        <p className={styles.revealBooster}>{booster.name}</p>
        <div className={styles.card} style={{ "--rar": card.rarityColor }}>
          <div className={styles.cardGlow} />
          <span className={styles.cardRarity}>{card.rarityLabel}</span>
          <span className={styles.cardName}>{card.name}</span>
        </div>
        <button className={styles.again} onClick={reset}>Ouvrir un autre code</button>
      </div>
    );
  }

  return (
    <div className={styles.opener}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="VOID-XXXX-XXXX"
          maxLength={14}
          onKeyDown={(e) => e.key === "Enter" && open()}
        />
        <button className={styles.openBtn} onClick={open} disabled={isPending || !code.trim()}>
          {isPending ? "Ouverture…" : "Ouvrir"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
