import type { Contact } from "@/lib/types/contact";

/*
 * Factory qui génère les contacts de seed avec des UUIDs frais à chaque appel.
 * Ne pas exporter comme const figée — les UUIDs doivent être générés au runtime
 * pour éviter les collisions avec des données déjà persistées en localStorage.
 */
export function getSeedContacts(): Contact[] {
  const now = new Date().toISOString();

  return [
    {
      id: crypto.randomUUID(),
      firstName: "Lylia",
      lastName: "Mellab",
      role: "Senior Sales Rep Data & AI",
      company: "Snowflake",
      companyDomain: "snowflake.com",
      stage: "contacted",
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      firstName: "Stevan",
      lastName: "Glehen",
      role: "Sales Specialist AI Business Solutions",
      company: "Microsoft",
      companyDomain: "microsoft.com",
      stage: "identified",
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      firstName: "Antoine",
      lastName: "Moyen",
      role: "Cloud Operations Architect",
      company: "AWS",
      companyDomain: "aws.amazon.com",
      stage: "contacted",
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      firstName: "Simine",
      lastName: "Sibony",
      role: "GTM",
      company: "Glean",
      companyDomain: "glean.com",
      stage: "in_conversation",
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      firstName: "Didi",
      lastName: "Diarra",
      role: "Senior Recruiter",
      company: "Microsoft",
      companyDomain: "microsoft.com",
      stage: "contacted",
      createdAt: now,
    },
  ];
}
