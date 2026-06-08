import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { sessions, users } from "@/src/db/schema";

const COOKIE = "void_session";
const MAX_AGE = 60 * 60 * 24 * 30;

export async function createSession(userId) {
  const token = crypto.randomUUID() + crypto.randomUUID();
  const expiresAt = new Date(Date.now() + MAX_AGE * 1000);
  await db.insert(sessions).values({ token, userId, expiresAt });

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  const [row] = await db.select().from(sessions).where(eq(sessions.token, token)).limit(1);
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) {
    await db.delete(sessions).where(eq(sessions.token, token));
    return null;
  }

  const [user] = await db.select().from(users).where(eq(users.id, row.userId)).limit(1);
  return user ?? null;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await db.delete(sessions).where(eq(sessions.token, token));
  store.delete(COOKIE);
}
