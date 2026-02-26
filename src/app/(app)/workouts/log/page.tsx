import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "Log Workout" };

export default function LogWorkoutPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/workouts">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Log a Workout</h2>
          <p className="text-muted-foreground mt-0.5">Record your exercises and sets.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">
          Workout logging form will be built in v0.3.
        </p>
      </div>
    </div>
  );
}
