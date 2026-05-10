export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export type ScoreLevel = "success" | "warning" | "danger";

export function getScoreThreshold(score: number): ScoreLevel {
  if (score > 70) return "success";
  if (score >= 40) return "warning";
  return "danger";
}

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
