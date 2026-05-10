"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStartTour: () => void;
}

export default function Hero({ onStartTour }: HeroProps) {
  return (
    <section className="py-8 max-w-3xl">

      {/* Eyebrow */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-pipe-accent/10 border border-pipe-accent/20 text-pipe-accent text-xs font-mono uppercase tracking-wider">
        Demo · Built in 3 days
      </div>

      {/* Titre */}
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground leading-tight">
        Agentic CRM pour candidatures sales tech
      </h1>

      {/* Sous-titre */}
      <p className="mt-3 text-base text-muted-foreground leading-relaxed">
        PipeAgent transforme une pipeline brute en workflow agentique. Pre-call research,
        emails contextuels et lead scoring, propulsés par Claude. Construit par Nicolas
        Masselot, M1 ESCP, en candidature stage juin 2026.
      </p>

      {/* CTAs */}
      <div className="mt-5 flex items-center gap-3">
        <Button
          onClick={onStartTour}
          className="bg-pipe-accent hover:bg-pipe-accent-hover text-white gap-2 text-sm"
        >
          <Play size={13} className="fill-white" />
          Lancer la démo guidée (60s)
        </Button>

        <Button variant="outline" size="default" className="gap-2 text-sm" asChild>
          <a
            href="https://github.com/NicolasMasselot/pipeagent"
            target="_blank"
            rel="noopener noreferrer"
            data-tour="github-cta"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            Voir le code
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-5 flex gap-6 text-xs text-muted-foreground">
        <span>8 contacts · pipeline de démo</span>
        <span>3 features IA · Claude Sonnet 4.6</span>
        <span>100% local storage · pas de DB</span>
      </div>

    </section>
  );
}
