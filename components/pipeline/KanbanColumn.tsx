"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Contact, Stage } from "@/lib/types/contact";
import ContactCard from "./ContactCard";

interface KanbanColumnProps {
  stage: { id: Stage; label: string; color: string };
  contacts: Contact[];
  onCardClick: (id: string) => void;
}

export default function KanbanColumn({ stage, contacts, onCardClick }: KanbanColumnProps) {
  /* Zone de drop — id = stage.id, utilisé par DndContext pour identifier la cible */
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });

  return (
    <div
      ref={setNodeRef}
      className={[
        "flex flex-col w-[300px] shrink-0 h-full bg-surface rounded-lg overflow-hidden transition-colors",
        /* Feedback visuel quand une carte survole cette colonne */
        isOver
          ? "border border-pipe-accent/60 ring-1 ring-pipe-accent/20 bg-surface-elevated"
          : "border border-border-subtle",
      ].join(" ")}
    >
      {/* Header sticky avec indicateur coloré + label + compteur */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-border-subtle sticky top-0 bg-surface z-10">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: stage.color }}
        />
        <span className="text-sm font-medium text-foreground flex-1">
          {stage.label}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {contacts.length}
        </span>
      </div>

      {/* Corps scrollable avec les cartes */}
      <div className="flex flex-col gap-2 p-2 overflow-y-auto flex-1">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onClick={() => onCardClick(contact.id)}
          />
        ))}
      </div>
    </div>
  );
}
