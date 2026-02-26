import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Good morning, John! 👋</h2>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your health summary for today.
        </p>
      </div>

      {/* Placeholder stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Calories", value: "—", sub: "kcal today", color: "var(--nutrition)" },
          { label: "Workouts", value: "—", sub: "this week", color: "var(--workout)" },
          { label: "Weight", value: "—", sub: "kg current", color: "var(--progress-accent)" },
          { label: "Water", value: "—", sub: "ml today", color: "var(--ai-accent)" },
        ].map((stat) => (
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

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Today&apos;s Nutrition</h3>
          <p className="text-sm text-muted-foreground">
            Nutrition tracking will appear here in v0.2.
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
