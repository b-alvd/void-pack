import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata = {
  title: "Void Pack — Next.js + Discord + Turso",
  description: "Base : auth Discord, profil, base Turso.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${geist.variable}`}>
      <body className="font-sans relative">{children}</body>
    </html>
  );
}
