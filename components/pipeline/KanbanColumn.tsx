"use client";

import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { Contact, Stage } from "@/lib/types/contact";
import ContactCard from "./ContactCard";

interface KanbanColumnProps {
  stage: { id: Stage; label: string; color: string };
  contacts: Contact[];
  onCardClick: (contact: Contact) => void;
  priorityContactId?: string;
}

export default memo(function KanbanColumn({ stage, contacts, onCardClick, priorityContactId }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col w-[320px] xl:w-auto shrink-0 xl:shrink bg-surface rounded-xl pipe-column-shadow transition-colors",
        isOver
          ? "border border-pipe-accent/50 ring-1 ring-pipe-accent/15"
          : "border border-border-subtle"
      )}
    >
      {/* Sticky only works in grid mode — overflow-x-auto on the parent disables it in flex mode. */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-border-subtle sticky top-[60px] z-10 bg-surface rounded-t-xl">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
        <span className="text-sm font-medium text-foreground flex-1">{stage.label}</span>
        <span className="font-mono text-xs text-muted-foreground">{contacts.length}</span>
      </div>

      <div className="flex flex-col gap-2 p-2">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onClick={() => onCardClick(contact)}
            isPriority={contact.id === priorityContactId}
          />
        ))}
      </div>
    </div>
  );
});
