"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Contact, SheetTab } from "@/lib/types/contact";
import { getPriorityContact } from "@/lib/utils/priority";

interface DemoTourProps {
  open: boolean;
  onClose: () => void;
  contacts: Contact[];
  onOpenSheet: (contact: Contact) => void;
  onCloseSheet: () => void;
  onSelectTab: (tab: SheetTab) => void;
}

type Action = "openSheet" | "switchResearch" | "switchEmails" | "closeSheet";

interface Step {
  targetSelector: string | null;
  narration: string;
  hasOverlay: boolean;
  action?: Action;
  autoAdvanceMs?: number;
  isLast?: boolean;
}

const STEPS: Step[] = [
  {
    targetSelector: '[data-tour="board"]',
    narration: "Voici une pipeline de candidatures sales tech. 4 stages, drag-and-drop.",
    hasOverlay: false,
    autoAdvanceMs: 3000,
  },
  {
    targetSelector: '[data-tour="card-priority"]',
    narration: "Chaque contact est scoré sur 3 axes par Claude : probabilité de réponse, fit profil, timing recrutement.",
    hasOverlay: true,
  },
  {
    targetSelector: '[data-tour="sheet-score"]',
    narration: "Ici, le breakdown détaillé du score sur 3 dimensions.",
    hasOverlay: false,
    action: "openSheet",
  },
  {
    targetSelector: '[data-tour="sheet-research"]',
    narration: "Pre-call research : brief boîte, profil, 3 angles de pitch, 3 questions à poser. Tout généré à la demande.",
    hasOverlay: false,
    action: "switchResearch",
  },
  {
    targetSelector: '[data-tour="sheet-emails"]',
    narration: "Emails contextualisés en 3 variantes : cold, relance, follow-up. Personnalisés à partir du profil cible et du mien.",
    hasOverlay: false,
    action: "switchEmails",
  },
  {
    targetSelector: null,
    narration: "Construit en 3 jours avec Claude Code. Stack : Next.js, TypeScript, Anthropic SDK.",
    hasOverlay: false,
    action: "closeSheet",
  },
  {
    targetSelector: '[data-tour="github-cta"]',
    narration: "Code source public. Merci d'avoir regardé.",
    hasOverlay: true,
    isLast: true,
  },
];

const RING_PAD = 6;
const ACTION_SETTLE_MS = 450;
const NO_ACTION_SETTLE_MS = 80;

/* Polls until the element exists AND has a non-zero rect. Radix Tabs keeps
   inactive panels in the DOM with `hidden`, so querying alone can resolve
   with a (0,0,0,0) rect during a tab transition. The cancel ref lets the
   step-effect cleanup abort the recursion immediately. */
function findElementRect(
  selector: string,
  cancelRef: { cancelled: boolean }
): Promise<DOMRect | null> {
  return new Promise((resolve) => {
    let attempts = 0;
    const check = () => {
      if (cancelRef.cancelled) {
        resolve(null);
        return;
      }
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el && el.offsetParent !== null) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          resolve(rect);
          return;
        }
      }
      if (attempts++ < 30) {
        setTimeout(check, 80);
      } else {
        resolve(null);
      }
    };
    check();
  });
}

export default function DemoTour({
  open,
  onClose,
  contacts,
  onOpenSheet,
  onCloseSheet,
  onSelectTab,
}: DemoTourProps) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setStep(0);
    } else {
      setRect(null);
      if (autoRef.current) {
        clearTimeout(autoRef.current);
        autoRef.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const current = STEPS[step];
    setRect(null);

    if (autoRef.current) {
      clearTimeout(autoRef.current);
      autoRef.current = null;
    }

    if (current.action === "openSheet") {
      const priority = getPriorityContact(contacts);
      if (priority) onOpenSheet(priority);
    } else if (current.action === "switchResearch") {
      onSelectTab("research");
    } else if (current.action === "switchEmails") {
      onSelectTab("emails");
    } else if (current.action === "closeSheet") {
      onCloseSheet();
    }

    const cancelRef = { cancelled: false };
    const settleTimer = setTimeout(async () => {
      if (cancelRef.cancelled || !current.targetSelector) return;
      const found = await findElementRect(current.targetSelector, cancelRef);
      if (cancelRef.cancelled) return;
      setRect(found);

      if (current.autoAdvanceMs) {
        autoRef.current = setTimeout(() => {
          setStep((s) => Math.min(s + 1, STEPS.length - 1));
        }, current.autoAdvanceMs);
      }
    }, current.action ? ACTION_SETTLE_MS : NO_ACTION_SETTLE_MS);

    return () => {
      cancelRef.cancelled = true;
      clearTimeout(settleTimer);
    };
  }, [step, open, contacts, onOpenSheet, onCloseSheet, onSelectTab]);

  function handleNext() {
    if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null; }
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  }

  function handleClose() {
    if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null; }
    onCloseSheet();
    onClose();
  }

  if (!open || !mounted) return null;

  const current = STEPS[step];

  /* Quadrants around the spotlight — keeps the highlighted element clickable. */
  const catchers = current.hasOverlay && rect ? [
    { top: 0, left: 0, width: "100vw", height: rect.top - RING_PAD },
    { top: rect.bottom + RING_PAD, left: 0, width: "100vw", height: `calc(100vh - ${rect.bottom + RING_PAD}px)` },
    { top: rect.top - RING_PAD, left: 0, width: rect.left - RING_PAD, height: rect.height + RING_PAD * 2 },
    { top: rect.top - RING_PAD, left: rect.right + RING_PAD, width: `calc(100vw - ${rect.right + RING_PAD}px)`, height: rect.height + RING_PAD * 2 },
  ] : current.hasOverlay ? [
    { top: 0, left: 0, width: "100vw", height: "100vh" },
  ] : [];

  return createPortal(
    <>
      {/* Dark quadrant overlay (click-catchers) */}
      {catchers.map((style, i) => (
        <div
          key={i}
          style={{ position: "fixed", background: "rgba(0,0,0,0.75)", zIndex: 9990, cursor: "default", ...style }}
          onClick={handleClose}
        />
      ))}

      {/* Spotlight ring around target */}
      {rect && (
        <div
          style={{
            position: "fixed",
            left: rect.left - RING_PAD,
            top: rect.top - RING_PAD,
            width: rect.width + RING_PAD * 2,
            height: rect.height + RING_PAD * 2,
            borderRadius: 10,
            outline: "2px solid var(--pipe-accent)",
            outlineOffset: 0,
            boxShadow: "0 0 16px 2px color-mix(in oklch, var(--pipe-accent) 40%, transparent)",
            zIndex: 9991,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Narration card */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: 480,
          maxWidth: "calc(100vw - 32px)",
        }}
        className="bg-surface-elevated border border-pipe-accent/30 rounded-xl p-5 shadow-[0_8px_40px_color-mix(in_oklch,var(--pipe-accent)_20%,transparent)]"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-muted-foreground">
            Étape {step + 1} / {STEPS.length}
          </span>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
            aria-label="Fermer le tour"
          >
            <X size={15} />
          </button>
        </div>

        {/* Narration */}
        <p key={step} className="text-sm text-foreground leading-relaxed animate-in fade-in duration-200">
          {current.narration}
        </p>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-xs text-muted-foreground h-7 px-2"
          >
            Skip
          </Button>
          <Button
            size="sm"
            onClick={current.isLast ? handleClose : handleNext}
            className="text-xs bg-pipe-accent hover:bg-pipe-accent-hover text-white h-7 px-3"
          >
            {current.isLast ? "Terminer ✓" : "Suivant →"}
          </Button>
        </div>
      </div>
    </>,
    document.body
  );
}
