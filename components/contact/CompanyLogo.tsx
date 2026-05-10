"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  domain?: string;
  name: string;
  size?: number;
  className?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function CompanyLogo({
  domain,
  name,
  size = 32,
  className,
}: CompanyLogoProps) {
  const [error, setError] = useState(false);

  const baseClass = "rounded-md border border-border shrink-0 flex items-center justify-center overflow-hidden";
  const style = { width: size, height: size, minWidth: size };

  if (!domain || error) {
    return (
      <div
        style={style}
        className={cn(baseClass, "bg-surface-elevated", className)}
      >
        <span
          style={{ fontSize: size * 0.34 }}
          className="font-semibold text-muted-foreground select-none leading-none"
        >
          {getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <div style={style} className={cn(baseClass, "bg-white", className)}>
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
