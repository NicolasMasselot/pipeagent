import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
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
    description: "CRM agentique pour candidatures sales tech. Pipeline, pre-call research, emails et lead scoring propulsés par Claude.",
    type: "website",
    url: "https://pipeagent.vercel.app",
    images: [
      {
        url: "https://pipeagent.vercel.app/screenshot.png",
        width: 1280,
        height: 800,
        alt: "PipeAgent — Agentic CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PipeAgent — Agentic CRM",
    description: "CRM agentique pour candidatures sales tech.",
    images: ["https://pipeagent.vercel.app/screenshot.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
