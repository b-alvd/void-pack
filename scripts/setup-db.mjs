import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

// Charge .env / .env.development si présents (sans dépendance)
for (const f of [".env", ".env.development", ".env.local"]) {
  try {
    for (const line of readFileSync(f, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.executeMultiple(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  discord_id TEXT NOT NULL UNIQUE,
  username TEXT,
  avatar TEXT,
  display_name TEXT,
  bio TEXT,
  created_at INTEGER
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
`);
console.log("✓ Tables créées dans", process.env.TURSO_DATABASE_URL);
