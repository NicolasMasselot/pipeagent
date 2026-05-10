import type { Contact, ContactResearch } from "@/lib/types/contact";
import type { UserProfile } from "@/lib/types/profile";
import { callClaudeJSON } from "@/lib/ai/claude-client";
import { PIPEAGENT_SYSTEM_BASE } from "@/lib/ai/prompts/system";
import { formatUserProfileContext } from "@/lib/ai/prompts/context";

export type EmailType = "cold" | "follow_up" | "relance";

const EMAIL_TYPE_INSTRUCTIONS: Record<EmailType, string> = {
  cold:
    "C'est un premier contact (cold email). L'email doit faire 90-130 mots. " +
    "Structure : accroche personnalisée sur l'entreprise ou le rôle, " +
    "pitch bref de Nicolas et de sa valeur ajoutée, CTA léger (ex: 15 min d'échange ?).",
  follow_up:
    "C'est un suivi après une réponse positive. L'email doit faire 60-90 mots. " +
    "Propose directement 2-3 créneaux concrets pour un échange.",
  relance:
    "C'est une relance 7-10 jours après un cold sans réponse. L'email doit faire 50-70 mots. " +
    "Ton léger, non culpabilisant. Ne pas mentionner l'absence de réponse de façon négative.",
};

export async function generateEmail(
  contact: Contact,
  profile: UserProfile,
  type: EmailType,
  research?: ContactResearch
): Promise<{ subject: string; body: string }> {
  const systemPrompt =
    PIPEAGENT_SYSTEM_BASE +
    "\n\nRègles absolues pour tous les emails :\n" +
    "- Pas d'emojis\n" +
    "- Pas de superlatifs (incroyable, passionnant, formidable…)\n" +
    "- Pas de formule 'j'espère que vous allez bien' ou équivalent\n" +
    "- Signature : simplement '— Nicolas'\n" +
    "- Ton direct, professionnel mais humain\n" +
    "- Langue : français";

  const researchContext = research
    ? `\n\nContexte de recherche disponible :\n` +
      `- Brief entreprise : ${research.companyBrief}\n` +
      `- Profil : ${research.personProfile}\n` +
      `- Angles de pitch disponibles (utilise-en au moins 1) :\n` +
      research.pitchAngles.map((a, i) => `  ${i + 1}. ${a}`).join("\n")
    : "";

  const prompt =
    `Rédige un email de type "${type}" pour le contact suivant.\n\n` +
    `**Destinataire :**\n` +
    `- Nom : ${contact.firstName} ${contact.lastName}\n` +
    `- Rôle : ${contact.role}\n` +
    `- Entreprise : ${contact.company}\n` +
    `${researchContext}\n\n` +
    `**Expéditeur (Nicolas) :**\n` +
    formatUserProfileContext(profile) + "\n\n" +
    `**Instructions pour ce type d'email :**\n${EMAIL_TYPE_INSTRUCTIONS[type]}\n\n` +
    `Retourne uniquement ce JSON :\n` +
    `{ "subject": "...", "body": "..." }`;

  return callClaudeJSON<{ subject: string; body: string }>({
    system: systemPrompt,
    prompt,
  });
}
