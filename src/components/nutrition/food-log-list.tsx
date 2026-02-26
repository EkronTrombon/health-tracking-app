"use client";

import { useOptimistic, useTransition } from "react";
import { MealSection } from "./meal-section";
import { deleteMealEntryAction } from "@/actions/nutrition.actions";
import type { FoodLogEntry, MealType } from "@/types/nutrition.types";

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

interface FoodLogListProps {
  byMealType: Record<MealType, FoodLogEntry[]>;
}

export function FoodLogList({ byMealType }: FoodLogListProps) {
  const [, startTransition] = useTransition();

  // Optimistic state — flatten all entries so we can remove by ID instantly
  const allEntries = MEAL_TYPES.flatMap((m) => byMealType[m]);

  const [optimisticEntries, removeOptimisticEntry] = useOptimistic(
    allEntries,
    (current: FoodLogEntry[], deletedId: string) =>
      current.filter((e) => e.id !== deletedId)
  );

  // Rebuild the byMealType map from the optimistic entries
  const optimisticByMealType = MEAL_TYPES.reduce<Record<MealType, FoodLogEntry[]>>(
    (acc, mealType) => {
      acc[mealType] = optimisticEntries.filter((e) => e.mealType === mealType);
      return acc;
    },
    { breakfast: [], lunch: [], dinner: [], snack: [] }
  );

  function handleDelete(entryId: string) {
    startTransition(async () => {
      // Update UI immediately (optimistic)
      removeOptimisticEntry(entryId);
      // Confirm on the server
      await deleteMealEntryAction(entryId);
    });
  }

  return (
    <div className="space-y-3">
      {MEAL_TYPES.map((mealType) => (
        <MealSection
          key={mealType}
          mealType={mealType}
          entries={optimisticByMealType[mealType]}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
