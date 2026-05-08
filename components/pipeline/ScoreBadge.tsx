/* Badge circulaire affichant le score IA d'un contact (0-100) */

interface ScoreBadgeProps {
  score?: number;
}

/* Détermine la couleur de fond selon la valeur du score */
function getScoreColor(score: number): string {
  if (score > 70) return "#10B981"; /* vert — bon fit */
  if (score >= 40) return "#F59E0B"; /* ambre — fit moyen */
  return "#EF4444"; /* rouge — faible fit */
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const hasScore = score !== undefined;

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
      style={{
        backgroundColor: hasScore ? getScoreColor(score!) : "#232327",
      }}
    >
      <span className="font-mono text-[10px] text-white leading-none select-none">
        {hasScore ? score : "—"}
      </span>
    </div>
  );
}
