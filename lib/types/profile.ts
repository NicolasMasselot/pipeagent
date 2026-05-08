/* Profil de l'utilisateur — utilisé pour personnaliser les emails et la recherche IA */

export interface UserProfile {
  fullName: string;
  program: string;
  internshipWindow: string;   /* période et durée du stage recherché */
  experiences: string[];
  projects: string[];
  certifications: string[];
}
