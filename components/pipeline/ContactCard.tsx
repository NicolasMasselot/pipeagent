"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Contact } from "@/lib/types/contact";
import { formatRelativeDate, getInitials } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import ScoreBadge from "./ScoreBadge";

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

export default function ContactCard({ contact, onClick }: ContactCardProps) {
  const { firstName, lastName, role, company, score, lastInteraction } = contact;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: contact.id,
  });

  const cardBg = "linear-gradient(145deg, oklch(0.18 0.024 268) 0%, oklch(0.14 0.016 276) 100%)";
  const style = {
    background: cardBg,
    ...(transform ? { transform: CSS.Translate.toString(transform) } : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={cn(
        "border border-border rounded-lg p-3 pipe-card-shadow",
        "cursor-grab active:cursor-grabbing transition-all duration-150",
        "hover:border-pipe-accent/50 hover:scale-[1.01]",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-pipe-accent flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-semibold leading-none select-none">
            {getInitials(firstName, lastName)}
          </span>
        </div>
        <span className="text-sm font-medium text-foreground truncate">
          {firstName} {lastName}
        </span>
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground truncate">{role}</p>
      <p className="text-xs text-muted-foreground truncate">{company}</p>

      <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
        <ScoreBadge score={score} />
        <span className="text-[11px] font-mono text-muted-foreground">
          {formatRelativeDate(lastInteraction)}
        </span>
      </div>
    </div>
  );
}
