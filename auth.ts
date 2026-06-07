import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/src/db";
import { users, accounts, sessions, verificationTokens } from "@/src/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Discord],
  session: { strategy: "database" },
  callbacks: {
    // On expose l'id et les champs de profil dans la session
    session({ session, user }) {
      session.user.id = user.id;
      // @ts-expect-error - champs personnalisés ajoutés au schéma
      session.user.displayName = user.displayName;
      // @ts-expect-error
      session.user.bio = user.bio;
      return session;
    },
  },
  pages: {
    signIn: "/", // on gère la connexion depuis la page d'accueil
  },
});
