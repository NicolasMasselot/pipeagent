"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WELCOME_KEY = "pipeagent.welcomed.v1";

const FEATURES = [
  "Pipeline visuelle — glisse-dépose tes contacts entre les étapes",
  "Recherche pre-call IA — brief entreprise, profil et angles de pitch",
  "Emails contextuels — cold, relance ou follow-up générés par Claude",
  "Lead scoring — 3 axes pour prioriser tes contacts",
];

interface WelcomeDialogProps {
  onStartTour?: () => void;
}

export default function WelcomeDialog({ onStartTour }: WelcomeDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(WELCOME_KEY) !== "true") {
      setOpen(true);
    }
  }, []);

  function handleStart() {
    localStorage.setItem(WELCOME_KEY, "true");
    setOpen(false);
    onStartTour?.();
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md gap-6"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Bienvenue dans PipeAgent
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            CRM agentique pour candidatures sales tech.
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-2.5">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-pipe-accent" />
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          8 contacts fictifs pré-chargés. Toutes les données sont stockées localement dans ton navigateur.
        </p>

        <DialogFooter>
          <Button
            onClick={handleStart}
            className="w-full bg-pipe-accent hover:bg-pipe-accent-hover text-white"
          >
            Lancer la démo guidée
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
