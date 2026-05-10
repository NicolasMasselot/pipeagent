/* Modèle de données principal pour les contacts de la pipeline */

export type Stage = "identified" | "contacted" | "in_conversation" | "internship";

export type SheetTab = "research" | "emails" | "notes";

/* Définition des étapes de la pipeline avec leur couleur d'affichage */
export const STAGES: { id: Stage; label: string; color: string }[] = [
  { id: "identified",      label: "Identifié",       color: "#71717A" },
  { id: "contacted",       label: "Contacté",        color: "#6366F1" },
  { id: "in_conversation", label: "En conversation", color: "#F59E0B" },
  { id: "internship",      label: "Stage",           color: "#10B981" },
];

/* Brief de recherche généré par l'IA pour un contact */
export interface ContactResearch {
  companyBrief: string;
  personProfile: string;
  pitchAngles: string[];  /* exactement 3 angles d'accroche */
  questions: string[];    /* exactement 3 questions de découverte */
  generatedAt: string;
}

/* Email généré par l'IA pour un contact */
export interface GeneratedEmail {
  id: string;
  type: "cold" | "follow_up" | "relance";
  subject: string;
  body: string;
  generatedAt: string;
}

/* Contact principal — unité centrale de la pipeline */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  companyDomain?: string;     /* ex: "snowflake.com" — utilisé pour les favicons */
  linkedinUrl?: string;
  stage: Stage;
  score?: number;             /* 0-100, score de pertinence calculé par l'IA */
  scoreBreakdown?: {
    responseProbability: number;
    profileFit: number;
    hiringTiming: number;
  };
  lastInteraction?: string;   /* date ISO de la dernière interaction */
  notes?: string;
  research?: ContactResearch; /* brief généré par l'IA */
  emails?: GeneratedEmail[];
  createdAt: string;          /* date ISO de création */
}
