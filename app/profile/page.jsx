import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/src/lib/session";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const user = await getSession();
  if (!user) redirect("/");

  return (
    <main className="relative z-10 min-h-screen px-8 py-10 max-w-2xl mx-auto">
      <nav className="flex items-center justify-between mb-16">
        <Link href="/" className="text-sm text-muted hover:text-paper transition-colors">← Accueil</Link>
        <a href="/api/auth/logout" className="text-sm text-muted hover:text-paper transition-colors">Déconnexion</a>
      </nav>

      <header className="rise flex items-center gap-5 mb-12">
        {user.avatar && <img src={user.avatar} alt="" className="h-20 w-20 rounded-full ring-1 ring-white/15" />}
        <div>
          <h1 className="font-display text-4xl tracking-tight">{user.displayName || user.username}</h1>
          <p className="text-muted text-sm mt-1">@{user.username}</p>
        </div>
      </header>

      <div className="rise rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="font-display text-2xl mb-1">Gestion du profil</h2>
        <p className="text-muted text-sm mb-8">Enregistré dans ta base Turso.</p>
        <ProfileForm displayName={user.displayName ?? ""} bio={user.bio ?? ""} />
      </div>
    </main>
  );
}
