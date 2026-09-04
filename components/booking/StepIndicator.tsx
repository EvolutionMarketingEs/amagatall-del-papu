export function StepIndicator({
  labels,
  current,
}: {
  labels: readonly string[];
  current: number; // 1-indexed
}) {
  return (
    <ol className="flex items-center justify-between gap-1 sm:gap-2">
      {labels.map((label, i) => {
        const step = i + 1;
        const state = step === current ? "current" : step < current ? "done" : "upcoming";
        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition sm:h-8 sm:w-8 ${
                state === "current"
                  ? "border-accent bg-accent text-white"
                  : state === "done"
                    ? "border-accent-strong bg-accent-strong/20 text-accent-strong"
                    : "border-border text-text-muted"
              }`}
              aria-current={state === "current" ? "step" : undefined}
            >
              {state === "done" ? "✓" : step}
            </div>
            <span
              className={`hidden text-center text-[11px] sm:block ${
                state === "upcoming" ? "text-text-muted" : "text-text"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
