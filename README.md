# Void Pack

## Stack

- Next.js 15 (App Router)
- OAuth2 Discord implémenté (`src/lib/discord.js`)
- Sessions par cookie + table `sessions` en base (`src/lib/session.js`)
- Drizzle ORM + Turso (libSQL)

Aucune dépendance d'authentification tierce : le flux est entièrement dans le repo, donc rien qui casse au gré des versions beta.

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
   - local : `http://localhost:****/api/auth/callback`
   - prod : `https://DOMAINE.**/api/auth/callback`
   La valeur de `DISCORD_REDIRECT_URI` dans `.env` doit être **identique** à celle déclarée ici.

## 3. Base de données

- **Local (fichier)** : `TURSO_DATABASE_URL=file:local.db`, token vide. `npm run db:setup:dev`.
- **Turso (cloud)** :
  ```bash
  turso db create void-pack
  turso db show void-pack --url      # -> TURSO_DATABASE_URL
  turso db tokens create void-pack   # -> TURSO_AUTH_TOKEN
  npm run db:setup:prod
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
