import { NextResponse } from "next/server";

/* Vérifie si la clé API Anthropic est configurée dans l'environnement */
export async function GET() {
  return NextResponse.json({ ok: !!process.env.ANTHROPIC_API_KEY });
}
