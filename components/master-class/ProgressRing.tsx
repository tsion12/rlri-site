const SIZE = 112;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(1, value));
  const pct = Math.round(clamped * 100);
  const offset = C * (1 - clamped);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mc-ring -rotate-90"
        role="img"
        aria-label={label}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          className="stroke-zinc-200 dark:stroke-zinc-800"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          className="stroke-teal-600 transition-[stroke-dashoffset] duration-700 ease-out dark:stroke-teal-400"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
          {pct}%
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">done</span>
      </div>
    </div>
  );
}
