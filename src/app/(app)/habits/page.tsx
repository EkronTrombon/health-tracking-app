import type { Metadata } from "next";
import { Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Habits" };

export default function HabitsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Habits
        </h2>
        <p className="text-muted-foreground mt-1">Build and track healthy daily habits.</p>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">Habit tracking coming in v0.7</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Daily habit checklists, streak tracking, water intake, and sleep logging.
        </p>
      </div>
    </div>
  );
}
