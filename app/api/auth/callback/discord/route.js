import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { exchangeCode, fetchDiscordUser } from "@/src/lib/discord";
import { createSession } from "@/src/lib/session";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";

export async function GET(request) {
  const code = new URL(request.url).searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/", request.url));

  const tokenData = await exchangeCode(code);
  const d = await fetchDiscordUser(tokenData.access_token);
  const avatar = d.avatar
    ? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png`
    : null;

  let [user] = await db.select().from(users).where(eq(users.discordId, d.id)).limit(1);
  if (!user) {
    [user] = await db
      .insert(users)
      .values({ discordId: d.id, username: d.username, avatar })
      .returning();
  } else {
    await db.update(users).set({ username: d.username, avatar }).where(eq(users.id, user.id));
  }

  await createSession(user.id);
  return NextResponse.redirect(new URL("/profile", request.url));
}
