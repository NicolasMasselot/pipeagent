import type { Contact, ContactResearch } from "@/lib/types/contact";
import type { UserProfile } from "@/lib/types/profile";
import { callClaudeJSON } from "@/lib/ai/claude-client";
import { PIPEAGENT_SYSTEM_BASE } from "@/lib/ai/prompts/system";
import { formatUserProfileContext } from "@/lib/ai/prompts/context";

export async function generateResearch(
  contact: Contact,
  profile: UserProfile
): Promise<ContactResearch> {
  const prompt = `
Tu dois générer un brief de recherche pre-call pour le contact suivant.

**Contact :**
- Nom : ${contact.firstName} ${contact.lastName}
- Rôle : ${contact.role}
- Entreprise : ${contact.company}${contact.companyDomain ? ` (${contact.companyDomain})` : ""}

**Profil de Nicolas (l'utilisateur) :**
${formatUserProfileContext(profile)}

Génère un JSON avec ce schéma exact. Sois factuel : si tu n'as pas d'info récente sur l'entreprise, dis ce que tu sais sans inventer de chiffres. Les pitchAngles et questions doivent être concrets et personnalisés aux expériences et projets de Nicolas.

{
  "companyBrief": "string (3-5 phrases sur l'entreprise et son contexte business actuel)",
  "personProfile": "string (2-4 phrases sur le rôle et ce que cette personne fait probablement au quotidien)",
  "pitchAngles": ["string", "string", "string"],
  "questions": ["string", "string", "string"]
}
`.trim();

  const result = await callClaudeJSON<Omit<ContactResearch, "generatedAt">>({
    system: PIPEAGENT_SYSTEM_BASE,
    prompt,
  });

  return {
    ...result,
    generatedAt: new Date().toISOString(),
  };
}
