"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions";
import styles from "./ProfileForm.module.css";

export default function ProfileForm({ displayName, bio }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [bioLen, setBioLen] = useState(bio.length);

  function action(formData) {
    setSaved(false);
    startTransition(async () => {
      await updateProfile(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <form action={action} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Nom affiché</span>
        <input name="displayName" defaultValue={displayName} maxLength={50}
          placeholder="Comment veux-tu être appelé·e ?" className={styles.input} />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Bio</span>
        <textarea name="bio" defaultValue={bio} maxLength={280} rows={4}
          onChange={(e) => setBioLen(e.target.value.length)}
          placeholder="Quelques mots sur toi…" className={styles.textarea} />
        <span className={styles.count}>{bioLen}/280</span>
      </label>

      <div className={styles.row}>
        <button type="submit" disabled={isPending} className={styles.submit}>
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {saved && <span className={styles.saved}>✓ Enregistré</span>}
      </div>
    </form>
  );
}
