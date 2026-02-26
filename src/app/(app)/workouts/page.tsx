import type { Metadata } from "next";
import { Dumbbell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "Workouts" };

export default function WorkoutsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-[var(--workout)]" />
            Workouts
          </h2>
          <p className="text-muted-foreground mt-1">Log exercises, sets, and reps.</p>
        </div>
        <Button asChild>
          <Link href="/workouts/log">
            <Plus className="w-4 h-4 mr-2" />
            Start Workout
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <Dumbbell className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">Workout tracking coming in v0.3</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Log workout sessions with exercises, sets, reps, and weights. Track your strength progress over time.
        </p>
      </div>
    </div>
  );
}
