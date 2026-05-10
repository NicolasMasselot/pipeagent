"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopbarProps {
  /* Titre de la page courante affiché à gauche */
  title: string;
}

/* Indicateur de statut de la clé API Claude */
function ClaudeApiStatus() {
  const [ok, setOk] = useState<boolean | null>(null);

  /* Interroge /api/health au montage pour savoir si la clé est configurée */
  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data: { ok: boolean }) => setOk(data.ok))
      .catch(() => setOk(false));
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      {/* Point de statut : vert si ok, gris sinon */}
      <div
        className={[
          "w-1.5 h-1.5 rounded-full",
          ok === true
            ? "bg-pipe-success"
            : "bg-muted-foreground",
        ].join(" ")}
      />
      <span className="text-xs text-muted-foreground font-mono select-none">
        Claude API
      </span>
    </div>
  );
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border shrink-0 bg-[oklch(0.08_0.005_285_/_0.80)] backdrop-blur-md">

      {/* Titre de la page */}
      <h1 className="text-sm font-semibold text-foreground tracking-tight">
        {title}
      </h1>

      {/* Actions droite : bouton + statut API */}
      <div className="flex items-center gap-4">
        {/* Bouton "Add contact" désactivé en V1 */}
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Le span permet au tooltip de fonctionner sur un bouton disabled */}
            <span tabIndex={0}>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="gap-1.5 text-muted-foreground cursor-not-allowed"
              >
                <Plus size={14} />
                Add contact
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bientôt</p>
          </TooltipContent>
        </Tooltip>

        {/* Indicateur de statut de la clé Anthropic */}
        <ClaudeApiStatus />
      </div>
    </header>
  );
}
