"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import type { Contact, Stage } from "@/lib/types/contact";
import { STAGES } from "@/lib/types/contact";
import { getPriorityContact } from "@/lib/utils/priority";
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const isDraggingRef = useRef(false);

  function handleDragStart() {
    isDraggingRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    isDraggingRef.current = false;

    if (!over) return;

    const contactId = active.id as string;
    const targetStage = over.id as Stage;

    const contact = contacts.find((c) => c.id === contactId);
    if (!contact || contact.stage === targetStage) return;

    const updated = contacts.map((c) =>
      c.id === contactId ? { ...c, stage: targetStage } : c
    );
    onContactsChange(updated);
  }

  const handleCardClick = useCallback((contact: Contact) => {
    if (isDraggingRef.current) return;
    onCardClick(contact);
  }, [onCardClick]);

  const priorityContactId = useMemo(
    () => getPriorityContact(contacts)?.id,
    [contacts]
  );

  const contactsByStage = useMemo(() => {
    const map = new Map<Stage, Contact[]>();
    for (const stage of STAGES) {
      map.set(stage.id, contacts.filter((c) => c.stage === stage.id));
    }
    return map;
  }, [contacts]);

  return (
    <div data-tour="board" className="min-h-[600px]">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* xl+: CSS grid (sticky headers work). <xl: flex + horizontal scroll. */}
        <div className="flex gap-4 overflow-x-auto items-start pb-2 xl:grid xl:grid-cols-4 xl:overflow-x-visible xl:pb-8">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              contacts={contactsByStage.get(stage.id)!}
              onCardClick={handleCardClick}
              priorityContactId={priorityContactId}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
