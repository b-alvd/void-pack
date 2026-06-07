import { getSession } from "@/src/lib/session";
import HudFrame from "@/components/HudFrame";

export default async function Home() {
  const user = await getSession();

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <HudFrame />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {!user && (
          <a
            href="/api/auth/login"
            className="group inline-flex items-center gap-3 rounded-full bg-violet px-7 py-4 font-medium text-white shadow-[0_0_40px_-8px_#7c3aed] transition-transform hover:scale-[1.03] active:scale-100"
          >
            <svg width="22" height="22" viewBox="0 0 127 96" fill="currentColor" aria-hidden>
              <path d="M107 8A105 105 0 0 0 81 0l-3 7a97 97 0 0 0-29 0l-4-7a105 105 0 0 0-26 8C2 33-1 57 1 81a106 106 0 0 0 32 16l4-6a68 68 0 0 1-11-5l3-2a75 75 0 0 0 64 0l3 2a68 68 0 0 1-11 5l4 6a106 106 0 0 0 32-16c3-28-2-52-19-73ZM42 65c-6 0-12-6-12-13s5-13 12-13 12 6 12 13-5 13-12 13Zm43 0c-7 0-12-6-12-13s5-13 12-13 12 6 12 13-5 13-12 13Z" />
            </svg>
            Se connecter avec Discord
          </a>
        )}
        {/* Connecté : centre vide pour le moment */}
      </div>
    </main>
  );
}
