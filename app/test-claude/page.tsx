"use client";

/* Page de test temporaire — sera supprimée à la phase 5 */

import { useState } from "react";
import { callClaude } from "@/lib/ai/claude-client";
import { PIPEAGENT_SYSTEM_BASE } from "@/lib/ai/prompts/system";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/layout/Topbar";

export default function TestClaudePage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const text = await callClaude({
        system: PIPEAGENT_SYSTEM_BASE,
        prompt: "Dis bonjour en une phrase.",
      });
      setResponse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Topbar title="Test Claude API" />

      <div className="flex flex-col gap-6 px-8 py-8 max-w-xl">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Envoie une requête de test à Claude via la route proxy{" "}
            <code className="font-mono text-xs bg-surface-elevated px-1.5 py-0.5 rounded">
              /api/claude
            </code>
            .
          </p>
          <Button onClick={handleTest} disabled={loading}>
            {loading ? "Envoi en cours…" : "Test Claude API"}
          </Button>
        </div>

        {/* Réponse de Claude */}
        {response && (
          <div className="rounded-lg border border-pipe-success/30 bg-pipe-success/5 px-4 py-3">
            <p className="text-xs text-pipe-success font-mono mb-1">Réponse Claude</p>
            <p className="text-sm text-foreground">{response}</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="rounded-lg border border-pipe-danger/30 bg-pipe-danger/5 px-4 py-3">
            <p className="text-xs text-pipe-danger font-mono mb-1">Erreur</p>
            <p className="text-sm text-foreground">{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
