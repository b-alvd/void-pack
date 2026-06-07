import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const [me] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  return (
    <main className="relative z-10 min-h-screen px-8 py-10 max-w-2xl mx-auto">
      <nav className="flex items-center justify-between mb-16">
        <Link href="/" className="text-sm text-muted hover:text-paper transition-colors">← Accueil</Link>
        <span className="font-display tracking-tight">Void Pack</span>
      </nav>

      <header className="rise flex items-center gap-5 mb-12">
        {me?.image && <img src={me.image} alt="" className="h-20 w-20 rounded-full ring-1 ring-white/15" />}
        <div>
          <h1 className="font-display text-4xl tracking-tight">{me?.displayName || me?.name}</h1>
          <p className="text-muted text-sm mt-1">{me?.email}</p>
        </div>
      </header>

      <div className="rise rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="font-display text-2xl mb-1">Gestion du profil</h2>
        <p className="text-muted text-sm mb-8">Ces champs sont enregistrés dans ta base Turso.</p>
        <ProfileForm displayName={me?.displayName ?? ""} bio={me?.bio ?? ""} />
      </div>
    </main>
  );
}
