"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Contact, GeneratedEmail } from "@/lib/types/contact";
import type { EmailType } from "@/lib/ai/email";
import { generateEmail } from "@/lib/ai/email";
import { USER_PROFILE } from "@/lib/data/profile";
import { formatRelativeDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

interface EmailPanelProps {
  contact: Contact;
  onUpdate: (c: Contact) => void;
}

const EMAIL_TYPES: { id: EmailType; label: string }[] = [
  { id: "cold",       label: "Cold" },
  { id: "relance",    label: "Relance" },
  { id: "follow_up",  label: "Follow-up" },
];

/* Squelette affiché pendant la génération */
function EmailSkeleton() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export default function EmailPanel({ contact, onUpdate }: EmailPanelProps) {
  const [activeType, setActiveType] = useState<EmailType>("cold");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Trouve le dernier email du type actif dans la liste du contact */
  const currentEmail = contact.emails
    ?.filter((e) => e.type === activeType)
    .sort((a, b) => b.generatedAt.localeCompare(a.generatedAt))[0];

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const result = await generateEmail(
        contact,
        USER_PROFILE,
        activeType,
        contact.research
      );
      const newEmail: GeneratedEmail = {
        id: crypto.randomUUID(),
        type: activeType,
        subject: result.subject,
        body: result.body,
        generatedAt: new Date().toISOString(),
      };
      const emails = [...(contact.emails ?? []), newEmail];
      onUpdate({ ...contact, emails });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  }

  /* Met à jour le body d'un email existant au blur */
  function handleBodyBlur(emailId: string, body: string) {
    const emails = (contact.emails ?? []).map((e) =>
      e.id === emailId ? { ...e, body } : e
    );
    onUpdate({ ...contact, emails });
  }

  /* Copie sujet + body au format standard et affiche un toast */
  function handleCopy(email: GeneratedEmail) {
    const text = `Subject: ${email.subject}\n\n${email.body}`;
    navigator.clipboard.writeText(text).then(() => {
      toast("Copié", { duration: 1500 });
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle group — sélection du type d'email */}
      <div className="flex gap-1 p-1 rounded-md bg-surface w-fit border border-border">
        {EMAIL_TYPES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => { setActiveType(id); setError(null); }}
            className={[
              "px-3 py-1.5 rounded text-xs font-medium transition-colors",
              activeType === id
                ? "bg-pipe-accent text-white"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* État : génération en cours */}
      {loading && <EmailSkeleton />}

      {/* État : email existant */}
      {!loading && currentEmail && (
        <div className="flex flex-col gap-3">
          {/* Barre d'actions */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              {formatRelativeDate(currentEmail.generatedAt)}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                className="text-xs text-muted-foreground h-7"
              >
                Régénérer
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(currentEmail)}
                className="text-xs h-7"
              >
                Copier
              </Button>
            </div>
          </div>

          {/* Sujet */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Sujet
            </span>
            <p className="text-sm font-medium text-foreground select-all px-3 py-2 bg-surface-elevated rounded border border-border">
              {currentEmail.subject}
            </p>
          </div>

          {/* Corps */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Corps
            </span>
            <Textarea
              defaultValue={currentEmail.body}
              onBlur={(e) => handleBodyBlur(currentEmail.id, e.target.value)}
              className="min-h-[200px] bg-surface-elevated border-border text-sm resize-none leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* État : pas encore d'email de ce type */}
      {!loading && !currentEmail && (
        <div className="flex flex-col gap-3">
          {error && (
            <p className="text-xs text-pipe-danger bg-pipe-danger/5 border border-pipe-danger/20 rounded px-3 py-2">
              {error}
            </p>
          )}
          <Button
            onClick={handleGenerate}
            className="w-fit bg-pipe-accent hover:bg-pipe-accent-hover text-white"
          >
            Générer
          </Button>
        </div>
      )}
    </div>
  );
}
