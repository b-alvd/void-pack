"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/src/lib/session";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";

export async function updateProfile(formData) {
  const user = await getSession();
  if (!user) throw new Error("Non authentifié");

  const displayName = String(formData.get("displayName") ?? "").slice(0, 50);
  const bio = String(formData.get("bio") ?? "").slice(0, 280);

  await db
    .update(users)
    .set({ displayName: displayName || null, bio: bio || null })
    .where(eq(users.id, user.id));

  revalidatePath("/profile");
}
