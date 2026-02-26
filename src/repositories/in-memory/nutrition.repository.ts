import type {
  INutritionRepository,
  DailyMacroTotal,
  IUpdateFoodLogEntry,
} from "../interfaces/nutrition.repository";
import type {
  FoodLogEntry,
  CreateFoodLogEntryInput,
  MacroTotals,
} from "@/types/nutrition.types";
import { generateId, isSameDay } from "@/lib/utils";

function sumMacros(entries: FoodLogEntry[]): MacroTotals {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export class InMemoryNutritionRepository implements INutritionRepository {
  private store: FoodLogEntry[] = [];

  async getFoodLogForDate(userId: string, date: Date): Promise<FoodLogEntry[]> {
    return this.store
      .filter(
        (e) => e.userId === userId && isSameDay(e.loggedAt, date)
      )
      .sort((a, b) => a.loggedAt.getTime() - b.loggedAt.getTime());
  }

  async getFoodLogForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<FoodLogEntry[]> {
    return this.store
      .filter(
        (e) =>
          e.userId === userId &&
          e.loggedAt >= startDate &&
          e.loggedAt <= endDate
      )
      .sort((a, b) => a.loggedAt.getTime() - b.loggedAt.getTime());
  }

  async createFoodLogEntry(
    input: CreateFoodLogEntryInput
  ): Promise<FoodLogEntry> {
    const entry: FoodLogEntry = {
      id: generateId(),
      userId: input.userId,
      foodName: input.foodName,
      brandName: input.brandName,
      calories: input.calories,
      protein: input.protein,
      carbs: input.carbs,
      fat: input.fat,
      mealType: input.mealType,
      loggedAt: new Date(),
    };
    this.store.push(entry);
    return entry;
  }

  async updateFoodLogEntry(
    id: string,
    input: IUpdateFoodLogEntry
  ): Promise<FoodLogEntry> {
    const index = this.store.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Food log entry ${id} not found`);

    const updated: FoodLogEntry = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...this.store[index]!,
      ...input,
    };
    this.store[index] = updated;
    return updated;
  }

  async deleteFoodLogEntry(id: string): Promise<void> {
    this.store = this.store.filter((e) => e.id !== id);
  }

  async getMacroTotalsForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DailyMacroTotal[]> {
    const entries = await this.getFoodLogForDateRange(
      userId,
      startDate,
      endDate
    );

    // Group by day
    const byDay = new Map<string, FoodLogEntry[]>();
    for (const entry of entries) {
      const key = entry.loggedAt.toDateString();
      const group = byDay.get(key) ?? [];
      group.push(entry);
      byDay.set(key, group);
    }

    return Array.from(byDay.entries()).map(([, dayEntries]) => ({
      date: dayEntries[0]!.loggedAt,
      totals: sumMacros(dayEntries),
      entryCount: dayEntries.length,
    }));
  }
}
