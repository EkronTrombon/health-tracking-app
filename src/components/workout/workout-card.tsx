import { Trash2, Clock, Dumbbell, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WorkoutSession } from "@/types/workout.types";

interface WorkoutCardProps {
  session: WorkoutSession;
  onDelete: (id: string) => void;
}

function formatDuration(minutes: number | undefined): string {
  if (minutes === undefined) return "In progress";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatSessionDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function WorkoutCard({ session, onDelete }: WorkoutCardProps) {
  const uniqueExercises = [...new Set(session.sets.map((s) => s.exerciseName))];
  return (
    <Card className="card-hover-lift">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* Session name + date */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold truncate">
                {session.name ?? "Workout Session"}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatSessionDate(session.startedAt)}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(session.durationMinutes)}
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" />
                {session.sets.length} sets
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {uniqueExercises.length} exercises
              </span>
            </div>

            {/* Exercise badges */}
            {uniqueExercises.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {uniqueExercises.slice(0, 4).map((name) => (
                  <Badge
                    key={name}
                    variant="secondary"
                    className="text-xs font-normal text-(--workout)"
                  >
                    {name}
                  </Badge>
                ))}
                {uniqueExercises.length > 4 && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    +{uniqueExercises.length - 4} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => onDelete(session.id)}
            aria-label="Delete workout"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

