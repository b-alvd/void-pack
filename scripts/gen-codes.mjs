import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

const boosterId = process.argv[2];
const count = parseInt(process.argv[3] || "5", 10);
const envFile = process.argv[4] || ".env.development";
if (!boosterId) { console.error("Usage: node scripts/gen-codes.mjs <booster_id> <nombre> [envFile]"); process.exit(1); }

try {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch { console.error(`✗ ${envFile} introuvable`); process.exit(1); }

const client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const block = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

console.log(`Codes générés pour "${boosterId}" :`);
for (let i = 0; i < count; i++) {
  const code = `VOID-${block()}-${block()}`;
  await client.execute({ sql: "INSERT INTO codes (code, booster_id) VALUES (?, ?)", args: [code, boosterId] });
  console.log("  " + code);
}
