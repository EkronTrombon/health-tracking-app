import { Progress } from "@/components/ui/progress";

interface MacroCardProps {
  label: string;
  value: number;
  goal?: number;
  unit: string;
  color: string; // CSS custom property value, e.g. "var(--nutrition)"
}

export function MacroCard({ label, value, goal, unit, color }: MacroCardProps) {
  const percent = goal ? Math.min(Math.round((value / goal) * 100), 100) : null;
  const remaining = goal ? Math.max(goal - value, 0) : null;

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-2 shadow-sm">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold" style={{ color }}>
          {Math.round(value)}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>

      {goal && percent !== null && remaining !== null && (
        <>
          <Progress
            value={percent}
            className="h-1.5"
            style={
              {
                "--progress-color": color,
              } as React.CSSProperties
            }
          />
          <p className="text-xs text-muted-foreground">
            {remaining > 0
              ? `${Math.round(remaining)}${unit} remaining of ${goal}${unit}`
              : `Goal reached! (${goal}${unit})`}
          </p>
        </>
      )}

      {!goal && (
        <p className="text-xs text-muted-foreground">No goal set</p>
      )}
    </div>
  );
}
