"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Contact, SheetTab } from "@/lib/types/contact";
import { loadContacts, saveContacts, resetContacts } from "@/lib/storage/contacts-store";
import { scoreContact, applyScoreResult } from "@/lib/ai/scoring";
import { USER_PROFILE } from "@/lib/data/profile";
import Topbar from "@/components/layout/Topbar";
import Hero from "@/components/layout/Hero";
import WelcomeDialog from "@/components/layout/WelcomeDialog";
import PipelineBoard from "@/components/pipeline/PipelineBoard";
import ContactDetailSheet from "@/components/contact/ContactDetailSheet";
import AddContactDialog from "@/components/contact/AddContactDialog";
import DemoTour from "@/components/demo/DemoTour";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [forcedTab, setForcedTab] = useState<SheetTab | undefined>(undefined);
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);
  const [addContactOpen, setAddContactOpen] = useState(false);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const handleCardClick = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setSheetOpen(true);
  }, []);

  function handleContactUpdate(updated: Contact) {
    setContacts((prev) => {
      const newContacts = prev.map((c) => (c.id === updated.id ? updated : c));
      saveContacts(newContacts);
      return newContacts;
    });
    setSelectedContact((prev) => (prev?.id === updated.id ? updated : prev));
  }

  function handleAddContact(contact: Contact) {
    const updated = [...contacts, contact];
    setContacts(updated);
    saveContacts(updated);

    toast("Contact ajouté · scoring en cours…");

    scoreContact(contact, USER_PROFILE)
      .then((result) => {
        handleContactUpdate(applyScoreResult(contact, result));
        toast.success(`Score calculé pour ${contact.firstName} ${contact.lastName}`);
      })
      .catch(() => {});
  }

  async function handleBulkScore() {
    const unscoredContacts = contacts.filter((c) => !c.score);
    if (!unscoredContacts.length) return;

    setBulkProgress({ done: 0, total: unscoredContacts.length });
    let errorCount = 0;

    for (let i = 0; i < unscoredContacts.length; i++) {
      const contact = unscoredContacts[i];
      try {
        const result = await scoreContact(contact, USER_PROFILE);
        handleContactUpdate(applyScoreResult(contact, result));
      } catch {
        errorCount++;
      }
      setBulkProgress({ done: i + 1, total: unscoredContacts.length });
    }

    setBulkProgress(null);

    if (errorCount > 0) {
      toast.error(`${errorCount} contact${errorCount > 1 ? "s" : ""} n'ont pas pu être scorés`);
    }
  }

  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const selectTab = useCallback((tab: SheetTab) => setForcedTab(tab), []);
  const closeTour = useCallback(() => {
    setTourOpen(false);
    setForcedTab(undefined);
  }, []);

  const allScored = contacts.length > 0 && contacts.every((c) => !!c.score);
  const isBulkRunning = bulkProgress !== null;

  return (
    <>
      <WelcomeDialog onStartTour={() => setTourOpen(true)} />
      <Topbar onAddContact={() => setAddContactOpen(true)} />

      <main className="px-6 pb-12">
        <Hero onStartTour={() => setTourOpen(true)} />

        {/* Board toolbar */}
        <div className="flex items-center justify-end gap-2 mb-3">
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
      </main>

      <ContactDetailSheet
        contact={selectedContact}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={handleContactUpdate}
        forcedTab={forcedTab}
        preventOutsideClose={tourOpen}
      />

      <AddContactDialog
        open={addContactOpen}
        onOpenChange={setAddContactOpen}
        onAdd={handleAddContact}
      />

      <DemoTour
        open={tourOpen}
        onClose={closeTour}
        contacts={contacts}
        onOpenSheet={handleCardClick}
        onCloseSheet={closeSheet}
        onSelectTab={selectTab}
      />
    </>
  );
}
