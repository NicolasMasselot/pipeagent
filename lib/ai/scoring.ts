import type { Contact } from "@/lib/types/contact";
import type { UserProfile } from "@/lib/types/profile";
import { callClaudeJSON } from "@/lib/ai/claude-client";
import { PIPEAGENT_SYSTEM_BASE } from "@/lib/ai/prompts/system";
import { formatUserProfileContext } from "@/lib/ai/prompts/context";

type ScoreBreakdown = NonNullable<Contact["scoreBreakdown"]>;

interface ScoringResult extends ScoreBreakdown {
  total: number;
  rationale: string;
}

export function applyScoreResult(contact: Contact, result: ScoringResult): Contact {
  return {
    ...contact,
    score: result.total,
    scoreBreakdown: {
      responseProbability: result.responseProbability,
      profileFit: result.profileFit,
      hiringTiming: result.hiringTiming,
    },
  };
}

export async function scoreContact(
  contact: Contact,
  profile: UserProfile
): Promise<ScoringResult> {
  const systemPrompt =
    PIPEAGENT_SYSTEM_BASE +
    "\n\nTu évalues un contact dans la pipeline de candidature de Nicolas. " +
    "Note de 0 à 100 chacun des 3 axes :\n" +
    "- responseProbability : probabilité que ce contact réponde à un cold email d'un étudiant M1 " +
    "(basé sur son rôle, son ancienneté, sa visibilité publique probable)\n" +
    "- profileFit : alignement entre le profil/poste du contact et le projet de Nicolas " +
    "(stage sales tech 6 mois, sales / GTM / solutions)\n" +
    "- hiringTiming : probabilité que sa boîte recrute des stagiaires sales sur la fenêtre juin/juillet 2026\n" +
    "Sois calibré et critique. Un score moyen est 50, pas 75.";

  const prompt =
    `Évalue ce contact pour la pipeline de Nicolas.\n\n` +
    `**Contact :**\n` +
    `- Nom : ${contact.firstName} ${contact.lastName}\n` +
    `- Rôle : ${contact.role}\n` +
    `- Entreprise : ${contact.company}\n` +
    `- Stage actuel : ${contact.stage}\n\n` +
    `**Profil de Nicolas :**\n` +
    formatUserProfileContext(profile) + "\n\n" +
    `Retourne uniquement ce JSON :\n` +
    `{ "responseProbability": number, "profileFit": number, "hiringTiming": number, "rationale": "string (1-2 phrases)" }`;

  const result = await callClaudeJSON<{
    responseProbability: number;
    profileFit: number;
    hiringTiming: number;
    rationale: string;
  }>({ system: systemPrompt, prompt });

  const total = Math.round(
    (result.responseProbability + result.profileFit + result.hiringTiming) / 3
  );

  return { ...result, total };
}
