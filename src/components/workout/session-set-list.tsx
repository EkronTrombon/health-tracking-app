import type { ExerciseSet } from "@/types/workout.types";
import { Badge } from "@/components/ui/badge";

interface SessionSetListProps {
  sets: ExerciseSet[];
}

function formatSet(set: ExerciseSet): string {
  if (set.reps !== undefined && set.weightKg !== undefined) {
    return `${set.reps} reps × ${set.weightKg} kg`;
  }
  if (set.reps !== undefined) {
    return `${set.reps} reps`;
  }
  if (set.durationSeconds !== undefined) {
    const m = Math.floor(set.durationSeconds / 60);
    const s = set.durationSeconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }
  return "—";
}

export function SessionSetList({ sets }: SessionSetListProps) {
  if (sets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No sets logged yet. Add your first exercise above.
      </p>
    );
  }

  // Group sets by exercise name
  const grouped = sets.reduce<Record<string, ExerciseSet[]>>((acc, set) => {
    if (!acc[set.exerciseName]) acc[set.exerciseName] = [];
    acc[set.exerciseName].push(set);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([exerciseName, exerciseSets]) => (
        <div key={exerciseName} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{exerciseName}</span>
            <Badge variant="secondary" className="text-xs">
              {exerciseSets.length} {exerciseSets.length === 1 ? "set" : "sets"}
            </Badge>
          </div>
          <div className="space-y-1 pl-3 border-l-2 border-muted">
            {exerciseSets.map((set) => (
              <div
                key={set.id}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="text-xs w-10 text-muted-foreground/60">
                  Set {set.setNumber}
                </span>
                <span>{formatSet(set)}</span>
                {set.rpe !== undefined && (
                  <span className="text-xs text-[var(--progress-accent)]">
                    RPE {set.rpe}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
