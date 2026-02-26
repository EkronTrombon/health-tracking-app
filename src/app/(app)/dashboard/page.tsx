import type { Metadata } from "next";
import { nutritionService } from "@/lib/di";
import { getCurrentUserId } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const userId = getCurrentUserId();
  const todaySummary = await nutritionService.getDailyNutritionSummary(userId, new Date());

  const stats = [
    { label: "Calories", value: todaySummary.totals.calories || "—", sub: "kcal today", color: "var(--nutrition)" },
    { label: "Workouts", value: "—", sub: "this week", color: "var(--workout)" },
    { label: "Weight", value: "—", sub: "kg current", color: "var(--progress-accent)" },
    { label: "Water", value: "—", sub: "ml today", color: "var(--ai-accent)" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Good morning, John! 👋</h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your health summary for today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-5 flex flex-col gap-1 shadow-sm"
          >
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </span>
            <span
              className="text-3xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground">{stat.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Today&apos;s Nutrition</h3>
          <p className="text-sm text-muted-foreground">
            {todaySummary.totals.calories > 0
              ? `${todaySummary.totals.calories} kcal logged across ${todaySummary.entries.length} item${todaySummary.entries.length === 1 ? "" : "s"}.`
              : "No meals logged yet today. Head to Nutrition to get started."}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Recent Workouts</h3>
          <p className="text-sm text-muted-foreground">
            Workout tracking will appear here in v0.3.
          </p>
        </div>
      </div>
    </div>
  );
}
