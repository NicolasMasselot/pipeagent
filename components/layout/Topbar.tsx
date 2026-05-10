"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/ui/brand-logo";

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
      <span className="text-xs text-muted-foreground font-mono select-none hidden sm:inline">
        Claude API
      </span>
    </div>
  );
}

export default function Topbar({ onAddContact }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-6 border-b border-border bg-background/80 backdrop-blur-md">

      {/* Left: brand */}
      <BrandLogo />

      {/* Right: actions + user */}
      <div className="flex items-center gap-3">
        <ClaudeApiStatus />

        <Button
          variant="ghost"
          size="sm"
          onClick={onAddContact}
          className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add contact</span>
        </Button>

        {/* Separator */}
        <div className="h-6 w-px bg-border" />

        {/* User block */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-pipe-accent flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold leading-none select-none">NM</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-medium text-foreground">Nicolas Masselot</span>
            <span className="text-[11px] text-muted-foreground">M1 ESCP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
