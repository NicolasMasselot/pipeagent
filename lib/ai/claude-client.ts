/* Client côté navigateur pour appeler la route proxy /api/claude */

interface CallClaudeArgs {
  system: string;
  prompt: string;
  jsonMode?: boolean;
}

/* Appelle le proxy Claude et retourne le texte brut de la réponse */
export async function callClaude(args: CallClaudeArgs): Promise<string> {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? `Erreur HTTP ${res.status}`);
  }

  return data.text as string;
}

/* Nettoie les éventuelles fences markdown que Claude pourrait ajouter malgré l'instruction */
function stripJsonFences(text: string): string {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

/* Appelle Claude en mode JSON et parse la réponse comme objet TypeScript */
export async function callClaudeJSON<T>(args: {
  system: string;
  prompt: string;
}): Promise<T> {
  const text = await callClaude({ ...args, jsonMode: true });
  const cleaned = stripJsonFences(text);

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    /* Inclut les 200 premiers caractères pour faciliter le debug */
    throw new Error(
      `Réponse Claude non parseable en JSON : ${cleaned.slice(0, 200)}`
    );
  }
}
