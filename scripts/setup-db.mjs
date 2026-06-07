import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

const envFile = process.argv[2] || ".env";

try {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  console.error(`✗ Fichier introuvable : ${envFile}`);
  process.exit(1);
}

if (!process.env.TURSO_DATABASE_URL) {
  console.error(`✗ TURSO_DATABASE_URL manquante dans ${envFile}`);
  process.exit(1);
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
console.log(`✓ Tables prêtes dans ${process.env.TURSO_DATABASE_URL}`);
console.log(`  (source : ${envFile})`);
