"use client";

import { useEffect, useState } from "react";
import type { Contact } from "@/lib/types/contact";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/utils/format";
import CompanyLogo from "./CompanyLogo";
import ResearchPanel from "./ResearchPanel";
import EmailPanel from "./EmailPanel";
import ScorePanel from "./ScorePanel";

interface ContactDetailSheetProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (contact: Contact) => void;
  forcedTab?: string;
}

export default function ContactDetailSheet({
  contact,
  open,
  onOpenChange,
  onUpdate,
  forcedTab,
}: ContactDetailSheetProps) {
  const [activeTab, setActiveTab] = useState("research");

  useEffect(() => {
    setActiveTab(forcedTab ?? "research");
  }, [forcedTab, contact?.id]);

  if (!contact) return null;

  function handleNotesBlur(notes: string) {
    onUpdate({ ...contact!, notes });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[560px] bg-surface border-border flex flex-col gap-0 p-0 overflow-y-auto"
      >
        <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-pipe-accent flex items-center justify-center">
                <span className="text-white text-base font-semibold leading-none select-none">
                  {getInitials(contact.firstName, contact.lastName)}
                </span>
              </div>
              {contact.companyDomain && (
                <div className="absolute -bottom-1 -right-1">
                  <CompanyLogo
                    domain={contact.companyDomain}
                    name={contact.company}
                    size={22}
                    className="shadow-sm"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <SheetTitle className="text-base font-semibold text-foreground leading-tight">
                {contact.firstName} {contact.lastName}
              </SheetTitle>
              <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
              <p className="text-sm text-muted-foreground truncate">{contact.company}</p>
              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pipe-accent hover:underline mt-1 w-fit"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          </div>

          <div className="mt-4" data-tour="sheet-score">
            <ScorePanel contact={contact} onUpdate={onUpdate} />
          </div>
        </SheetHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <TabsList className="mx-6 mt-4 shrink-0 w-fit">
            <TabsTrigger value="research">Recherche</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent
            value="research"
            data-tour="sheet-research"
            className="flex-1 overflow-y-auto px-6 py-4"
          >
            <ResearchPanel contact={contact} onUpdate={onUpdate} />
          </TabsContent>

          <TabsContent
            value="emails"
            data-tour="sheet-emails"
            className="flex-1 overflow-y-auto px-6 py-4"
          >
            <EmailPanel contact={contact} onUpdate={onUpdate} />
          </TabsContent>

          <TabsContent value="notes" className="flex-1 px-6 py-4">
            <Textarea
              placeholder="Ajoute des notes sur ce contact…"
              defaultValue={contact.notes ?? ""}
              onBlur={(e) => handleNotesBlur(e.target.value)}
              className="min-h-[200px] bg-surface-elevated border-border text-sm resize-none"
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
