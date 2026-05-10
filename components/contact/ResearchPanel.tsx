"use client";

import { useState } from "react";
import type { Contact } from "@/lib/types/contact";
import { USER_PROFILE } from "@/lib/data/profile";
import { generateResearch } from "@/lib/ai/research";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/lib/utils/format";

interface ResearchPanelProps {
  contact: Contact;
  onUpdate: (c: Contact) => void;
}

/* Liste de bullets pour les angles et questions */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-foreground">
          <span className="text-pipe-accent shrink-0 font-mono text-xs mt-0.5">
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Section titrée du brief */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h4>
      {children}
    </div>
  );
}

/* Squelette affiché pendant la génération */
function ResearchSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[80, 60, 90, 70].map((w, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className={`h-4 w-${w === 60 ? "3/5" : w === 70 ? "4/5" : "full"}`} />
          <Skeleton className="h-4 w-4/5" />
          {w >= 80 && <Skeleton className="h-4 w-3/5" />}
        </div>
      ))}
    </div>
  );
}

export default function ResearchPanel({ contact, onUpdate }: ResearchPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const research = await generateResearch(contact, USER_PROFILE);
      onUpdate({ ...contact, research });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  }

  /* État : génération en cours */
  if (loading) return <ResearchSkeleton />;

  /* État : pas encore de brief */
  if (!contact.research) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Brief boîte, profil, 3 angles de pitch, 3 questions à poser.
        </p>
        {error && (
          <p className="text-xs text-pipe-danger bg-pipe-danger/5 border border-pipe-danger/20 rounded px-3 py-2">
            {error}
          </p>
        )}
        <Button
          onClick={handleGenerate}
          className="w-fit bg-pipe-accent hover:bg-pipe-accent-hover text-white"
        >
          Générer le brief
        </Button>
      </div>
    );
  }

  /* État : brief disponible */
  const { companyBrief, personProfile, pitchAngles, questions, generatedAt } =
    contact.research;

  return (
    <div className="flex flex-col gap-5">
      <Section title="Brief entreprise">
        <p className="text-sm text-foreground leading-relaxed">{companyBrief}</p>
      </Section>

      <Section title="Profil">
        <p className="text-sm text-foreground leading-relaxed">{personProfile}</p>
      </Section>

      <Section title="Angles de pitch">
        <BulletList items={pitchAngles} />
      </Section>

      <Section title="Questions à poser">
        <BulletList items={questions} />
      </Section>

      {/* Footer : date + bouton régénérer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground font-mono">
          Généré {formatRelativeDate(generatedAt)}
        </span>
        {error && (
          <span className="text-xs text-pipe-danger">{error}</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGenerate}
          className="text-xs text-muted-foreground"
        >
          Régénérer
        </Button>
      </div>
    </div>
  );
}
