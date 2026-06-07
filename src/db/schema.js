import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  discordId: text("discord_id").notNull().unique(),
  username: text("username"),
  avatar: text("avatar"),
  displayName: text("display_name"),
  bio: text("bio"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});

export const sessions = sqliteTable("sessions", {
  token: text("token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
});
