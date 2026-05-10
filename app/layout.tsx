import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

/* Geist Sans — police principale pour tout le texte UI */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Geist Mono — police pour les chiffres, scores et code */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PipeAgent",
  description: "Agentic CRM for sales tech internship hunting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* dark = thème sombre forcé comme défaut de l'application */
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="h-full">
        <TooltipProvider>
          {/* Shell principal : sidebar fixe à gauche + zone de contenu scrollable */}
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-y-auto">
              {children}
            </main>
          </div>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
