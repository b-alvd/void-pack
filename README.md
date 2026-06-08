# Void Pack

Base Next.js avec **connexion Discord faite maison** (OAuth2, sans `next-auth`),
sessions stockées dans **Turso**, gestion de profil.

## Stack

- Next.js 15 (App Router)
- OAuth2 Discord implémenté à la main (`src/lib/discord.js`)
- Sessions par cookie + table `sessions` en base (`src/lib/session.js`)
- Drizzle ORM + Turso (libSQL)

Aucune dépendance d'authentification tierce : le flux est entièrement dans le repo,
donc rien qui casse au gré des versions beta.

## 1. Installation

```bash
npm install
copy .env.example .env      # Windows (PowerShell : Copy-Item .env.example .env)
```

Remplis `.env`, puis :

```bash
npm run db:setup            # crée les tables (local OU Turso, selon TURSO_DATABASE_URL)
npm run dev                 # http://localhost:3000
```

## 2. Application Discord

1. https://discord.com/developers/applications → New Application
2. Onglet **OAuth2** → copie **Client ID** et **Client Secret** dans `.env`
   (`DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`)
3. **OAuth2 → Redirects**, ajoute exactement :
   - local : `http://localhost:3000/api/auth/callback`
   - prod : `https://TON-DOMAINE.vercel.app/api/auth/callback`
   La valeur de `DISCORD_REDIRECT_URI` dans `.env` doit être **identique** à celle déclarée ici.

## 3. Base de données

- **Local (fichier)** : `TURSO_DATABASE_URL=file:local.db`, token vide. `npm run db:setup`.
- **Turso (cloud)** :
  ```bash
  turso db create void-pack
  turso db show void-pack --url      # -> TURSO_DATABASE_URL
  turso db tokens create void-pack   # -> TURSO_AUTH_TOKEN
  npm run db:setup
  ```

## 4. Déploiement Vercel

```bash
vercel
```
Ajoute les variables dans **Vercel → Settings → Environment Variables** :
`APP_URL`, `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI`
(avec le domaine de prod), `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`.
N'oublie pas d'ajouter l'URL de callback de prod dans les redirects Discord. Puis :
```bash
vercel --prod
```

## Comment marche l'auth

1. `/api/auth/login` redirige vers Discord.
2. Discord renvoie sur `/api/auth/callback?code=…`.
3. Le callback échange le code, récupère le profil Discord, crée/maj l'utilisateur,
   crée une session (token aléatoire) en base et la pose dans un cookie `httpOnly`.
4. `getSession()` lit le cookie, retrouve la session puis l'utilisateur en base.
5. `/api/auth/logout` supprime la session et le cookie.

## Le fond d'écran

Dépose ton image dans `public/bg.png` (ou change le nom dans `app/page.jsx`).

## Structure

```
app/
  page.jsx                  accueil (fond + HUD + bouton Discord si déconnecté)
  profile/page.jsx          profil (protégé)
  actions.js                mise à jour du profil
  api/auth/login            redirection Discord
  api/auth/callback         échange du code + création de session
  api/auth/logout           déconnexion
src/
  db/{index,schema}.js      Turso/Drizzle + tables users & sessions
  lib/discord.js            URLs et appels Discord
  lib/session.js            cookie + sessions en base
components/                 HudFrame, ProfileForm
scripts/setup-db.mjs        création des tables (local ou distant)
```
