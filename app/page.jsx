import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #d4ff3f, transparent 60%)" }}
      />
      <nav className="z-10 flex items-center justify-between px-8 py-6">
        <span className="font-display text-xl tracking-tight">Void Pack</span>
        {session?.user && (
          <Link href="/profile" className="text-sm text-muted hover:text-paper transition-colors">
            Mon profil →
          </Link>
        )}
      </nav>

      <section className="z-10 flex-1 flex flex-col justify-center px-8 max-w-3xl mx-auto w-full">
        <p className="rise text-accent text-sm uppercase tracking-[0.3em] mb-6">Base de projet</p>
        <h1 className="rise font-display text-6xl md:text-7xl leading-[0.95] tracking-tight mb-8">
          Next.js, Discord<br />et Turso.
          <span className="text-muted"> Prêt à déployer.</span>
        </h1>
        <p className="rise text-muted text-lg max-w-xl mb-12 leading-relaxed">
          Connexion via Discord, sessions en base, gestion de profil. Tout est câblé.
        </p>

        {session?.user ? (
          <div className="rise flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user.image && (
                <img src={session.user.image} alt="" className="h-11 w-11 rounded-full ring-1 ring-white/15" />
              )}
              <span className="text-sm">
                Connecté en tant que <span className="text-paper">{session.user.name}</span>
              </span>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
              <button className="text-sm text-muted hover:text-paper transition-colors underline underline-offset-4">
                Déconnexion
              </button>
            </form>
          </div>
        ) : (
          <form action={async () => { "use server"; await signIn("discord", { redirectTo: "/profile" }); }}>
            <button className="rise group inline-flex items-center gap-3 rounded-full bg-[#5865F2] px-7 py-4 font-medium text-white transition-transform hover:scale-[1.02] active:scale-100">
              <svg width="22" height="22" viewBox="0 0 127 96" fill="currentColor" aria-hidden>
                <path d="M107 8A105 105 0 0 0 81 0l-3 7a97 97 0 0 0-29 0l-4-7a105 105 0 0 0-26 8C2 33-1 57 1 81a106 106 0 0 0 32 16l4-6a68 68 0 0 1-11-5l3-2a75 75 0 0 0 64 0l3 2a68 68 0 0 1-11 5l4 6a106 106 0 0 0 32-16c3-28-2-52-19-73ZM42 65c-6 0-12-6-12-13s5-13 12-13 12 6 12 13-5 13-12 13Zm43 0c-7 0-12-6-12-13s5-13 12-13 12 6 12 13-5 13-12 13Z" />
              </svg>
              Se connecter avec Discord
            </button>
          </form>
        )}
      </section>

      <footer className="z-10 px-8 py-6 text-xs text-muted">Next.js 15 · Auth.js · Drizzle · Turso</footer>
    </main>
  );
}
