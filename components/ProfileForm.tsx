"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions";

export default function ProfileForm({
  displayName,
  bio,
}: {
  displayName: string;
  bio: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [bioLen, setBioLen] = useState(bio.length);

  function action(formData: FormData) {
    setSaved(false);
    startTransition(async () => {
      await updateProfile(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-muted">
          Nom affiché
        </span>
        <input
          name="displayName"
          defaultValue={displayName}
          maxLength={50}
          placeholder="Comment veux-tu être appelé·e ?"
          className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-paper outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-muted">
          Bio
        </span>
        <textarea
          name="bio"
          defaultValue={bio}
          maxLength={280}
          rows={4}
          onChange={(e) => setBioLen(e.target.value.length)}
          placeholder="Quelques mots sur toi…"
          className="resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-paper outline-none transition-colors focus:border-accent"
        />
        <span className="self-end text-xs text-muted">{bioLen}/280</span>
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-accent px-6 py-3 font-medium text-ink transition-opacity disabled:opacity-50"
        >
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {saved && (
          <span className="text-sm text-accent">✓ Enregistré</span>
        )}
      </div>
    </form>
  );
}
