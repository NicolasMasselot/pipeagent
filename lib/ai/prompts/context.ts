import type { UserProfile } from "@/lib/types/profile";

export function formatUserProfileContext(profile: UserProfile): string {
  return (
    `- Programme : ${profile.program}\n` +
    `- Objectif : ${profile.internshipWindow}\n` +
    `- Expériences : ${profile.experiences.join(", ")}\n` +
    `- Projets : ${profile.projects.join(", ")}\n` +
    `- Certifications : ${profile.certifications.join(", ")}`
  );
}
