"use server";

import { auth } from "@/auth";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  const displayName = String(formData.get("displayName") ?? "").slice(0, 50);
  const bio = String(formData.get("bio") ?? "").slice(0, 280);

  await db
    .update(users)
    .set({ displayName: displayName || null, bio: bio || null })
    .where(eq(users.id, session.user.id));

  revalidatePath("/profile");
}
