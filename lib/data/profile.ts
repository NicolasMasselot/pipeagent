import type { UserProfile } from "@/lib/types/profile";

/* Profil de Nicolas Masselot — injecté dans les prompts IA pour personnaliser les emails */
export const USER_PROFILE: UserProfile = {
  fullName: "Nicolas Masselot",
  program: "M1 ESCP Business School",
  internshipWindow: "Stage sales tech 6 mois, juin/juillet 2026",
  experiences: [
    "Investance Partners — formations clients sur produits complexes",
    "Wealth Partners Fund",
  ],
  projects: [
    "Heirl",
    "Carry Regime Compass",
  ],
  certifications: [
    "AMF",
    "BMC",
    "Building with the Claude API",
    "MCP",
  ],
};
