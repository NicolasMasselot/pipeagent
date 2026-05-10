"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import type { Contact, Stage } from "@/lib/types/contact";
import { STAGES } from "@/lib/types/contact";
import { saveContacts } from "@/lib/storage/contacts-store";
import KanbanColumn from "./KanbanColumn";

interface PipelineBoardProps {
  onCardClick: (contact: Contact) => void;
  contacts: Contact[];
  onContactsChange: (contacts: Contact[]) => void;
}

export default function PipelineBoard({
  onCardClick,
  contacts,
  onContactsChange,
}: PipelineBoardProps) {
  /* 5px threshold prevents drag from firing on simple clicks */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  /* Suppresses the synthetic onClick emitted right after a drag ends */
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setTimeout(() => setIsDragging(false), 50);

    if (!over) return;

    const contactId = active.id as string;
    const targetStage = over.id as Stage;

    const contact = contacts.find((c) => c.id === contactId);
    if (!contact || contact.stage === targetStage) return;

    const updated = contacts.map((c) =>
      c.id === contactId ? { ...c, stage: targetStage } : c
    );
    onContactsChange(updated);
    saveContacts(updated);
  }

  function handleCardClick(contact: Contact) {
    if (isDragging) return;
    onCardClick(contact);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
