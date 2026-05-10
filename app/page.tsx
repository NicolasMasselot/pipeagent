"use client";

import { useEffect, useState } from "react";
import type { Contact } from "@/lib/types/contact";
import { loadContacts, saveContacts, resetContacts } from "@/lib/storage/contacts-store";
import { scoreContact, applyScoreResult } from "@/lib/ai/scoring";
import { USER_PROFILE } from "@/lib/data/profile";
import Topbar from "@/components/layout/Topbar";
import PipelineBoard from "@/components/pipeline/PipelineBoard";
import ContactDetailSheet from "@/components/contact/ContactDetailSheet";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  function handleCardClick(contact: Contact) {
    setSelectedContact(contact);
    setSheetOpen(true);
  }

  function handleContactUpdate(updated: Contact) {
    setContacts((prev) => {
      const newContacts = prev.map((c) => (c.id === updated.id ? updated : c));
      saveContacts(newContacts);
      return newContacts;
    });
    /* Keep selectedContact in sync so the open sheet reflects bulk score updates */
    setSelectedContact((prev) => (prev?.id === updated.id ? updated : prev));
  }

  async function handleBulkScore() {
    const unscoredContacts = contacts.filter((c) => !c.score);
    if (!unscoredContacts.length) return;

    setBulkProgress({ done: 0, total: unscoredContacts.length });

    for (let i = 0; i < unscoredContacts.length; i++) {
      const contact = unscoredContacts[i];
      try {
        const result = await scoreContact(contact, USER_PROFILE);
        handleContactUpdate(applyScoreResult(contact, result));
      } catch {
        /* Continue on failure so a single bad contact doesn't abort the batch */
      }
      setBulkProgress({ done: i + 1, total: unscoredContacts.length });
    }

    setBulkProgress(null);
  }

  const allScored = contacts.length > 0 && contacts.every((c) => !!c.score);
  const isBulkRunning = bulkProgress !== null;

  return (
    <>
      <Topbar title="Pipeline" />

      <div className="flex items-center justify-end gap-3 px-6 pt-3">
        {isBulkRunning && (
          <span className="text-xs font-mono text-muted-foreground">
            {bulkProgress.done} / {bulkProgress.total} scorés
          </span>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleBulkScore}
          disabled={allScored || isBulkRunning}
          className="text-xs text-muted-foreground"
        >
          {isBulkRunning ? "Scoring…" : "Scorer tous les contacts"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          disabled={isBulkRunning}
          onClick={() => {
            if (!window.confirm("Réinitialiser la pipeline aux contacts d'origine ?")) return;
            const seed = resetContacts();
            setContacts(seed);
            setSelectedContact(null);
          }}
          className="text-xs text-muted-foreground"
        >
          Reset pipeline
        </Button>
      </div>

      <PipelineBoard
        contacts={contacts}
        onContactsChange={(updated) => {
          setContacts(updated);
          saveContacts(updated);
        }}
        onCardClick={handleCardClick}
      />

      <ContactDetailSheet
        contact={selectedContact}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={handleContactUpdate}
      />
    </>
  );
}
