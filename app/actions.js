"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/src/lib/session";
import { db } from "@/src/db";
import { users, codes, userCards } from "@/src/db/schema";
import { rollCard } from "@/src/lib/packs";
import { getBooster, RARITIES } from "@/src/data/boosters";

export async function updateProfile(formData) {
  const user = await getSession();
  if (!user) throw new Error("Non authentifié");
  const displayName = String(formData.get("displayName") ?? "").trim().slice(0, 50);
  const bio = String(formData.get("bio") ?? "").trim().slice(0, 280);
  await db.update(users).set({ displayName: displayName || null, bio: bio || null }).where(eq(users.id, user.id));
  revalidatePath("/profile");
}

export async function openPack(rawCode) {
  const user = await getSession();
  if (!user) return { error: "Connecte-toi pour ouvrir un pack." };

  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { error: "Entre un code." };

  const [row] = await db.select().from(codes).where(eq(codes.code, code)).limit(1);
  if (!row) return { error: "Code invalide." };
  if (row.usedBy) return { error: "Ce code a déjà été utilisé." };

  const card = rollCard(row.boosterId);
  if (!card) return { error: "Booster introuvable." };

  await db.update(codes).set({ usedBy: user.id, usedAt: new Date() }).where(eq(codes.code, code));
  await db.insert(userCards).values({
    userId: user.id,
    boosterId: row.boosterId,
    cardId: card.id,
    rarity: card.rarity,
  });

  const booster = getBooster(row.boosterId);
  const rar = RARITIES[card.rarity];
  revalidatePath("/profile");
  return {
    card: {
      id: card.id,
      name: card.name,
      rarity: card.rarity,
      rarityLabel: rar?.label ?? card.rarity,
      rarityColor: rar?.color ?? "#9ca3af",
    },
    booster: { id: booster.id, name: booster.name, accent: booster.accent },
  };
}
