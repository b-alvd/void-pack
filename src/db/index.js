import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

let _db;
function init() {
  if (!_db) {
    _db = drizzle(
      createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
      { schema }
    );
  }
  return _db;
}

export const db = new Proxy(
  {},
  {
    get(_t, prop) {
      const real = init();
      const value = real[prop];
      return typeof value === "function" ? value.bind(real) : value;
    },
  }
);
