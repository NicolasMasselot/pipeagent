/* Utilitaires de formatage des dates et valeurs d'affichage */

/*
 * Formate une date ISO en durée relative lisible.
 * Exemples : "aujourd'hui", "il y a 3j", "—" si undefined.
 */
export function formatRelativeDate(iso?: string): string {
  if (!iso) return "—";

  const date = new Date(iso);
  if (isNaN(date.getTime())) return "—";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return "il y a 1j";
  return `il y a ${diffDays}j`;
}
