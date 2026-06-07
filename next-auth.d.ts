import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      displayName?: string | null;
      bio?: string | null;
    } & DefaultSession["user"];
  }
}
