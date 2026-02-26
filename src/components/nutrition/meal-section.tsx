import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodLogEntryRow } from "./food-log-entry";
import type { FoodLogEntry, MealType } from "@/types/nutrition.types";

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const MEAL_ICONS: Record<MealType, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "🍎",
};

interface MealSectionProps {
  mealType: MealType;
  entries: FoodLogEntry[];
  onDelete: (entryId: string) => void;
}

export function MealSection({ mealType, entries, onDelete }: MealSectionProps) {
  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Meal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <span className="text-base">{MEAL_ICONS[mealType]}</span>
          <span className="font-semibold text-sm">{MEAL_LABELS[mealType]}</span>
          {entries.length > 0 && (
            <span className="text-xs text-muted-foreground">
              · {entries.length} item{entries.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {entries.length > 0 && (
            <span className="text-sm font-medium" style={{ color: "var(--nutrition)" }}>
              {Math.round(totalCalories)} kcal
            </span>
          )}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1"
          >
            <Link href={`/nutrition/log?meal=${mealType}`}>
              <Plus className="w-3.5 h-3.5" />
              Add
            </Link>
          </Button>
        </div>
      </div>

      {/* Entries */}
      {entries.length > 0 ? (
        <div className="px-2 py-1">
          {entries.map((entry) => (
            <FoodLogEntryRow
              key={entry.id}
              entry={entry}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">
          Nothing logged yet
        </p>
      )}
    </div>
  );
}
