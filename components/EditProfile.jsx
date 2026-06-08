"use client";

import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/actions";
import styles from "./EditProfile.module.css";

export default function EditProfile({ displayName, bio }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bioLen, setBioLen] = useState(bio.length);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape" && !isPending) setOpen(false); }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, isPending]);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateProfile(formData);
      router.refresh();
      setOpen(false);
    });
  }

  const modal = (
    <div className={styles.overlay} onClick={() => !isPending && setOpen(false)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Modifier le profil</h3>
        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Nom affiché</span>
            <input name="displayName" defaultValue={displayName} maxLength={50}
              placeholder="Ton nom affiché" className={styles.input} autoFocus />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Bio</span>
            <textarea name="bio" defaultValue={bio} maxLength={280} rows={4}
              onChange={(e) => setBioLen(e.target.value.length)}
              placeholder="Quelques mots sur toi…" className={styles.textarea} />
            <span className={styles.count}>{bioLen}/280</span>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel}
              onClick={() => setOpen(false)} disabled={isPending}>Annuler</button>
            <button type="submit" className={styles.save} disabled={isPending}>
              {isPending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button className={styles.trigger} onClick={() => setOpen(true)}>
        Modifier
      </button>
      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
