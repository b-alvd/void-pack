# Atelier — base Next.js + Discord + Turso

Point de départ prêt à déployer : connexion Discord (Auth.js), sessions stockées
en base, gestion de profil, base de données Turso via Drizzle ORM.

## Stack

- **Next.js 15** (App Router, server actions)
- **Auth.js v5** (`next-auth`) — provider Discord
- **Drizzle ORM** + **@libsql/client** — base **Turso** (libSQL/SQLite)
- **Tailwind CSS**

---

## 1. Installation locale

```bash
npm install
cp .env.example .env
```

Remplis `.env` (voir les 3 sections ci-dessous), puis :

```bash
npm run db:push   # crée les tables dans Turso
npm run dev       # http://localhost:3000
```

---

## 2. Créer l'application Discord

1. https://discord.com/developers/applications → **New Application**
2. Onglet **OAuth2** → copie le **Client ID** et le **Client Secret**
   → dans `.env` : `AUTH_DISCORD_ID` et `AUTH_DISCORD_SECRET`
3. Toujours dans **OAuth2** → **Redirects**, ajoute :
   - en local : `http://localhost:3000/api/auth/callback/discord`
   - en prod : `https://TON-DOMAINE.vercel.app/api/auth/callback/discord`

## 3. Créer la base Turso

```bash
# Installer le CLI (une fois)
curl -sSfL https://get.tur.so/install.sh | bash

turso auth login
turso db create atelier
turso db show atelier --url          # → TURSO_DATABASE_URL
turso db tokens create atelier       # → TURSO_AUTH_TOKEN
```

Reporte les deux valeurs dans `.env`, puis `npm run db:push`.

## 4. Secret Auth.js

```bash
openssl rand -base64 33   # → AUTH_SECRET
```

---

## 5. Déploiement sur Vercel

```bash
npm i -g vercel
vercel            # premier déploiement (lie le projet)
```

Puis dans **Vercel → Settings → Environment Variables**, ajoute les 5 variables
de ton `.env` (`AUTH_SECRET`, `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`,
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`).

> ⚠️ Pense à ajouter l'URL de callback de production dans les redirects Discord
> (étape 2) une fois ton domaine Vercel connu.

Enfin :

```bash
vercel --prod
```

C'est en ligne. 🎉

---

## Structure

```
auth.ts                       config Auth.js (Discord + adaptateur Drizzle)
app/
  layout.tsx                  polices, styles globaux
  page.tsx                    accueil + connexion Discord
  profile/page.tsx            profil (protégé, lit Turso)
  actions.ts                  server action de mise à jour du profil
  api/auth/[...nextauth]/     handler Auth.js
components/ProfileForm.tsx    formulaire de profil (client)
src/db/
  schema.ts                   tables Auth.js + champs displayName/bio
  index.ts                    client Turso/Drizzle
drizzle.config.ts             config des migrations
```

## Prochaines étapes possibles

- Ajouter d'autres providers (Google, GitHub) dans `auth.ts`
- Protéger des routes via un `middleware.ts`
- Ajouter des tables métier dans `src/db/schema.ts` puis `npm run db:push`
