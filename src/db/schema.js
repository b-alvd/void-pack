import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  discordId: text("discord_id").notNull().unique(),
  username: text("username"),
  avatar: text("avatar"),
  displayName: text("display_name"),
  bio: text("bio"),
  level: integer("level").default(1),
  xp: integer("xp").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});

export const sessions = sqliteTable("sessions", {
  token: text("token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
});

export const codes = sqliteTable("codes", {
  code: text("code").primaryKey(),
  boosterId: text("booster_id").notNull(),
  usedBy: text("used_by").references(() => users.id),
  usedAt: integer("used_at", { mode: "timestamp_ms" }),
});

export const userCards = sqliteTable("user_cards", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  boosterId: text("booster_id").notNull(),
  cardId: text("card_id").notNull(),
  rarity: text("rarity"),
  obtainedAt: integer("obtained_at", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});
