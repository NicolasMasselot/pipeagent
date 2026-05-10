import { callClaudeJSON } from "@/lib/ai/claude-client";
import { PIPEAGENT_SYSTEM_BASE } from "@/lib/ai/prompts/system";

export interface ExtractedContact {
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  companyDomain?: string;
}

export async function extractContactFromText(
  rawText: string
): Promise<ExtractedContact> {
  const system =
    PIPEAGENT_SYSTEM_BASE +
    "\n\nTu es un extracteur d'informations de contact. " +
    "Extrait uniquement ce que tu peux affirmer avec confiance depuis le texte fourni. " +
    "Si tu n'es pas sûr d'un champ, mets \"\" pour ce champ. " +
    "Pour companyDomain, devine le domaine si l'entreprise est connue (ex: Snowflake → snowflake.com, Databricks → databricks.com, Microsoft → microsoft.com). " +
    "Si l'entreprise est inconnue ou incertaine, omets companyDomain. " +
    "Réponds uniquement en JSON, sans texte additionnel.";

  const prompt =
    `Extrais les informations de contact depuis ce texte :\n\n${rawText}\n\n` +
    `Retourne exactement ce JSON :\n` +
    `{ "firstName": "string", "lastName": "string", "role": "string", "company": "string", "companyDomain": "string ou omis" }`;

  return callClaudeJSON<ExtractedContact>({ system, prompt });
}
