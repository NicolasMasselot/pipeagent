"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import type { Contact, Stage } from "@/lib/types/contact";
import { STAGES } from "@/lib/types/contact";
import { loadContacts, saveContacts, resetContacts } from "@/lib/storage/contacts-store";
import KanbanColumn from "./KanbanColumn";
import { Button } from "@/components/ui/button";

export default function PipelineBoard() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  /* Charge les contacts depuis localStorage au montage */
  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  /* Seuil de 5px avant de déclencher un drag — permet au clic court de passer */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  /* Gestion de la fin d'un drag : change le stage si la colonne cible est différente */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const contactId = active.id as string;
    const targetStage = over.id as Stage;

    const contact = contacts.find((c) => c.id === contactId);
    if (!contact || contact.stage === targetStage) return;

    const updated = contacts.map((c) =>
      c.id === contactId ? { ...c, stage: targetStage } : c
    );
    setContacts(updated);
    saveContacts(updated);
  }

  /* Réinitialise la pipeline aux contacts du seed après confirmation */
  function handleReset() {
    if (!window.confirm("Réinitialiser la pipeline aux contacts d'origine ?")) return;
    setContacts(resetContacts());
  }

  /* Clic sur une carte — le panneau de détail sera branché ici en V2 */
  function handleCardClick(id: string) {
    console.log("contact clicked:", id);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Barre d'actions du board */}
      <div className="flex justify-end px-6 pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground text-xs"
        >
          Reset pipeline
        </Button>
      </div>

      {/* Board Kanban avec contexte DnD */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 px-6 py-4 overflow-x-auto flex-1 items-start">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              contacts={contacts.filter((c) => c.stage === stage.id)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
