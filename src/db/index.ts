import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

let _db: LibSQLDatabase<typeof schema> | null = null;

export function getDb() {
  if (_db) return _db;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("TURSO_DATABASE_URL manquante");
  _db = drizzle(createClient({ url, authToken }), { schema });
  return _db;
}
