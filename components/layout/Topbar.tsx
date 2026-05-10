"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onAddContact: () => void;
}

function ClaudeApiStatus() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data: { ok: boolean }) => setOk(data.ok))
      .catch(() => setOk(false));
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={[
          "w-1.5 h-1.5 rounded-full",
          ok === true ? "bg-pipe-success" : "bg-muted-foreground",
        ].join(" ")}
      />
      <span className="text-xs text-muted-foreground font-mono select-none">
        Claude API
      </span>
    </div>
  );
}

export default function Topbar({ onAddContact }: TopbarProps) {
  return (
    <header className="flex items-center justify-end h-14 px-6 border-b border-border shrink-0 bg-[oklch(0.08_0.005_285_/_0.80)] backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddContact}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Plus size={14} />
          Add contact
        </Button>

        <ClaudeApiStatus />
      </div>
    </header>
  );
}
