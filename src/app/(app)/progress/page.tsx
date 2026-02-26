import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[var(--progress-accent)]" />
          Progress
        </h2>
        <p className="text-muted-foreground mt-1">Charts, trends, and your health journey.</p>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
        <h3 className="font-semibold text-lg mb-1">Progress analytics coming in v0.4</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Calorie trends, macro breakdowns, workout volume charts, and body weight tracking.
        </p>
      </div>
    </div>
  );
}
