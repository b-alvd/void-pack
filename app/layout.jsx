import "./globals.css";
import HudFrame from "@/components/HudFrame";

export const metadata = {
  title: "Void Pack",
  description: "Ouvre le booster. Révèle ta carte.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Geist:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/logo-simple.png" />
      </head>
      <body>
        {children}
        <HudFrame />
      </body>
    </html>
  );
}
