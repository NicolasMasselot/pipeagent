import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PipeAgent — Agentic CRM",
  description: "CRM agentique pour candidatures sales tech. Pipeline visuelle, recherche pre-call IA, génération d'emails et lead scoring.",
  openGraph: {
    title: "PipeAgent — Agentic CRM",
    description: "CRM agentique pour candidatures sales tech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="h-full">
        <TooltipProvider>
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
