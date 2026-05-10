import type { UserProfile } from "@/lib/types/profile";

/* Profil de Nicolas Masselot — injecté dans les prompts IA pour personnaliser les emails et la recherche */
export const USER_PROFILE: UserProfile = {
  fullName: "Nicolas Masselot",
  program: "M1 ESCP Business School (Grandes Écoles, classé 2e/40 en prépa Blaise Pascal)",
  internshipWindow: "Stage sales tech 6 mois, juin/juillet 2026",
  experiences: [
    "Investance Partners (Junior Analyst, stagiaire) — animation de 4 sessions de formation sur site pour 40 utilisateurs dans une grande banque marocaine (satisfaction 4,5/5) ; auteur d'un rapport de 25 pages sur les technologies de paiement émergentes (monnaies numériques, blockchain, plateformes souveraines)",
    "Cours particuliers de mathématiques en freelance (lycée et prépa) — amélioration moyenne de 2 points sur 20 pour 3 élèves",
  ],
  projects: [
    "PipeAgent — CRM agentique déployé en production avec pipeline Kanban, scoring IA et génération d'emails contextualisés (Next.js, TypeScript, Claude API)",
    "Carry Regime Compass — dashboard macro interactif qui ingère des données marché en temps réel et classe l'environnement sur 5 classes d'actifs (Python, Streamlit)",
    "Scribe — extension Chrome de traduction on-device en un raccourci clavier, sans copier-coller ni changement d'onglet (JavaScript, Chrome APIs)",
  ],
  certifications: [
    "Building with the Claude API (Anthropic)",
    "MCP — Model Context Protocol",
    "Claude Code et workflows agentiques",
  ],
};
