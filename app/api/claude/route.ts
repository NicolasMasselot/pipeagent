import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

/* Exécuté côté serveur Node.js — la clé n'est jamais transmise au client */
export const runtime = "nodejs";
export const maxDuration = 30;

interface ClaudeRequestBody {
  system: string;
  prompt: string;
  jsonMode?: boolean;
}

export async function POST(req: NextRequest) {
  /* Vérifie la présence de la clé sans jamais la logger ni l'exposer */
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  let body: ClaudeRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { system, prompt, jsonMode = false } = body;

  /* En mode JSON, on renforce l'instruction dans le system prompt */
  const finalSystem = jsonMode
    ? `${system}\n\nReply with ONLY a valid JSON object, no prose, no markdown fences.`
    : system;

  try {
    const client = new Anthropic();

    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      system: finalSystem,
      messages: [{ role: "user", content: prompt }],
    });

    /* Concatène tous les blocs de type text de la réponse */
    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("");

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
