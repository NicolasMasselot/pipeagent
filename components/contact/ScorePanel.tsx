"use client";

import { useState } from "react";
import type { Contact } from "@/lib/types/contact";
import { USER_PROFILE } from "@/lib/data/profile";
import { scoreContact, applyScoreResult } from "@/lib/ai/scoring";
import { getScoreThreshold } from "@/lib/utils/format";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ScorePanelProps {
  contact: Contact;
  onUpdate: (c: Contact) => void;
}

const SCORE_TEXT: Record<string, string> = {
  success: "text-pipe-success",
  warning: "text-pipe-warning",
  danger:  "text-pipe-danger",
};

const SCORE_BG: Record<string, string> = {
  success: "var(--pipe-success)",
  warning: "var(--pipe-warning)",
  danger:  "var(--pipe-danger)",
};

const AXES: { key: keyof NonNullable<Contact["scoreBreakdown"]>; label: string }[] = [
  { key: "responseProbability", label: "Probabilité de réponse" },
  { key: "profileFit",          label: "Fit profil" },
  { key: "hiringTiming",        label: "Timing recrutement" },
];

export default function ScorePanel({ contact, onUpdate }: ScorePanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleScore() {
    setLoading(true);
    setError(null);
    try {
      const result = await scoreContact(contact, USER_PROFILE);
      onUpdate(applyScoreResult(contact, result));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur lors du scoring";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  if (!contact.score || !contact.scoreBreakdown) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center font-mono text-[10px] text-muted-foreground">
          —
        </div>
        <span className="text-xs text-muted-foreground">Score : —</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleScore}
          disabled={loading}
          className="text-xs h-6 px-2 text-muted-foreground ml-auto"
        >
          {loading ? "Calcul…" : "Calculer le score"}
        </Button>
        {error && <span className="text-xs text-pipe-danger">{error}</span>}
      </div>
    );
  }

  const { score, scoreBreakdown } = contact;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className={`text-4xl font-mono font-bold tabular-nums ${SCORE_TEXT[getScoreThreshold(score)]}`}>
          {score}
        </span>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {AXES.map(({ key, label }) => {
            const value = scoreBreakdown[key];
            const level = getScoreThreshold(value);
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-36 shrink-0 truncate">
                  {label}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${value}%`, backgroundColor: SCORE_BG[level] }}
                  />
                </div>
                <span className={`text-[10px] font-mono w-7 text-right tabular-nums ${SCORE_TEXT[level]}`}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {error && <span className="text-xs text-pipe-danger">{error}</span>}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleScore}
          disabled={loading}
          className="text-xs text-muted-foreground ml-auto h-6 px-2"
        >
          {loading ? "Calcul…" : "Recalculer"}
        </Button>
      </div>
    </div>
  );
}
