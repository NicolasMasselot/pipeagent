import { getScoreThreshold } from "@/lib/utils/format";

interface ScoreBadgeProps {
  score?: number;
}

const SCORE_BG: Record<string, string> = {
  success: "var(--pipe-success)",
  warning: "var(--pipe-warning)",
  danger:  "var(--pipe-danger)",
};

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const hasScore = score !== undefined;

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
      style={{
        backgroundColor: hasScore ? SCORE_BG[getScoreThreshold(score!)] : "#232327",
      }}
    >
      <span className="font-mono text-[10px] text-white leading-none select-none">
        {hasScore ? score : "—"}
      </span>
    </div>
  );
}
