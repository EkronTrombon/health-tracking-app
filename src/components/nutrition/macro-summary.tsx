import { MacroCard } from "./macro-card";
import type { MacroTotals } from "@/types/nutrition.types";
import type { UserProfile } from "@/types/user.types";

interface MacroSummaryProps {
  totals: MacroTotals;
  profile: UserProfile;
}

export function MacroSummary({ totals, profile }: MacroSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <MacroCard
        label="Calories"
        value={totals.calories}
        goal={profile.dailyCalorieGoal}
        unit="kcal"
        color="var(--nutrition)"
      />
      <MacroCard
        label="Protein"
        value={totals.protein}
        goal={profile.proteinGoalGrams}
        unit="g"
        color="oklch(0.55 0.18 230)"
      />
      <MacroCard
        label="Carbs"
        value={totals.carbs}
        unit="g"
        color="var(--progress-accent)"
      />
      <MacroCard
        label="Fat"
        value={totals.fat}
        unit="g"
        color="var(--workout)"
      />
    </div>
  );
}
