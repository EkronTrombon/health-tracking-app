import type { Metadata } from "next";
import Link from "next/link";
import { Dumbbell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutHistoryList } from "@/components/workout/workout-history-list";
import { workoutService } from "@/lib/di";
import { getCurrentUserId } from "@/lib/auth";

export const metadata: Metadata = { title: "Workouts" };

export default async function WorkoutsPage() {
  const userId = getCurrentUserId();
  const sessions = await workoutService.getRecentWorkouts(userId, 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-(--workout)" />
            Workouts
          </h2>
          <p className="text-muted-foreground mt-1">
            {sessions.length > 0
              ? `${sessions.length} session${sessions.length === 1 ? "" : "s"} logged`
              : "Log exercises, sets, and reps."}
          </p>
        </div>
        <Button asChild>
          <Link href="/workouts/log">
            <Plus className="w-4 h-4 mr-2" />
            Start Workout
          </Link>
        </Button>
      </div>

      <WorkoutHistoryList sessions={sessions} />
    </div>
  );
}
