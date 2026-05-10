"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Contact, Stage } from "@/lib/types/contact";
import { STAGES } from "@/lib/types/contact";
import { extractContactFromText, type ExtractedContact } from "@/lib/ai/extract-contact";

const EXAMPLE_BIO = `Thomas Leclerc — Senior Account Executive @ Mistral AI
Helping European enterprises adopt frontier AI in production. Former SDR @ Salesforce (2 ans), AE @ HubSpot (3 ans). Passionné par le mouvement PLG et les cycles de vente complexes B2B.
Basé à Paris. Ouvert aux échanges sur l'IA générative en entreprise.
🔗 linkedin.com/in/thomasleclerc-ai`;

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (contact: Contact) => void;
}

export default function AddContactDialog({
  open,
  onOpenChange,
  onAdd,
}: AddContactDialogProps) {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedContact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("identified");

  function reset() {
    setRawText("");
    setExtracted(null);
    setError(null);
    setStage("identified");
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function fillExample() {
    setRawText(EXAMPLE_BIO);
    setExtracted(null);
    setError(null);
  }

  async function handleExtract() {
    if (!rawText.trim()) return;
    setLoading(true);
    setExtracted(null);
    setError(null);

    try {
      const result = await extractContactFromText(rawText.trim());
      if (!result.firstName || !result.lastName || !result.company) {
        setError(
          "Pas assez d'infos détectées. Réessaie avec un texte plus complet."
        );
      } else {
        setExtracted(result);
      }
    } catch {
      setError("Erreur lors de l'extraction. Vérifie ta connexion et réessaie.");
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    if (!extracted) return;

    const now = new Date().toISOString();
    const contact: Contact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      firstName: extracted.firstName,
      lastName: extracted.lastName,
      role: extracted.role,
      company: extracted.company,
      companyDomain: extracted.companyDomain,
      stage,
      createdAt: now,
    };

    onAdd(contact);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px] gap-5">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            <Plus size={16} className="text-pipe-accent" />
            Ajouter un contact
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Colle une bio LinkedIn (ou n&apos;importe quel texte). Claude extrait
            automatiquement les infos.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              if (extracted) setExtracted(null);
              if (error) setError(null);
            }}
            rows={8}
            placeholder="John Doe — Senior Account Executive @ Snowflake. Helping data teams modernize their warehouse…"
            className="bg-surface-elevated border-border text-sm resize-none"
          />

          <button
            type="button"
            onClick={fillExample}
            className="text-xs text-pipe-accent hover:underline w-fit"
          >
            Essayer avec un exemple
          </button>
        </div>

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {extracted && (
          <div className="rounded-lg border border-border bg-surface-elevated p-4 flex flex-col gap-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Infos détectées
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <Field label="Prénom" value={extracted.firstName} />
              <Field label="Nom" value={extracted.lastName} />
              <Field label="Rôle" value={extracted.role} />
              <Field label="Entreprise" value={extracted.company} />
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-border mt-1">
              <label className="text-xs text-muted-foreground shrink-0">
                Stage initial
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as Stage)}
                className="text-xs bg-surface border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-pipe-accent"
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenChange(false)}
            className="text-xs text-muted-foreground"
          >
            Annuler
          </Button>

          {!extracted ? (
            <Button
              size="sm"
              onClick={handleExtract}
              disabled={!rawText.trim() || loading}
              className="text-xs bg-pipe-accent hover:bg-pipe-accent-hover text-white"
            >
              {loading ? "Extraction…" : "Extraire et ajouter"}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleAdd}
              className="text-xs bg-pipe-accent hover:bg-pipe-accent-hover text-white"
            >
              Ajouter à la pipeline
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground truncate">
        {value || <span className="text-muted-foreground italic">—</span>}
      </span>
    </div>
  );
}
