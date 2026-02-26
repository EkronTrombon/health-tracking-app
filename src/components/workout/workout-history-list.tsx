"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { Dumbbell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "./workout-card";
import { deleteWorkoutSessionAction } from "@/actions/workout.actions";
import type { WorkoutSession } from "@/types/workout.types";

interface WorkoutHistoryListProps {
  sessions: WorkoutSession[];
}

export function WorkoutHistoryList({ sessions }: WorkoutHistoryListProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticSessions, removeOptimisticSession] = useOptimistic(
    sessions,
    (current, deletedId: string) => current.filter((s) => s.id !== deletedId)
  );

  function handleDelete(sessionId: string) {
    startTransition(async () => {
      removeOptimisticSession(sessionId);
      await deleteWorkoutSessionAction(sessionId);
    });
  }

  if (optimisticSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Dumbbell className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold">No workouts yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start your first session to begin tracking.
          </p>
        </div>
        <Button asChild>
          <Link href="/workouts/log">
            <Plus className="w-4 h-4 mr-2" />
            Start Workout
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3" aria-busy={isPending}>
      {optimisticSessions.map((session) => (
        <WorkoutCard key={session.id} session={session} onDelete={handleDelete} />
      ))}
    </div>
  );
}
