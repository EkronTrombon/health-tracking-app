import type { INutritionRepository } from "@/repositories/interfaces/nutrition.repository";
import type {
  FoodLogEntry,
  CreateFoodLogEntryInput,
  DailyNutritionSummary,
  MealType,
  MacroTotals,
} from "@/types/nutrition.types";

export class NutritionService {
  constructor(private readonly repo: INutritionRepository) {}

  async logMeal(
    userId: string,
    input: Omit<CreateFoodLogEntryInput, "userId">
  ): Promise<FoodLogEntry> {
    if (input.calories < 0) {
      throw new Error("Calories cannot be negative");
    }
    return this.repo.createFoodLogEntry({ ...input, userId });
  }

  async getDailyNutritionSummary(
    userId: string,
    date: Date
  ): Promise<DailyNutritionSummary> {
    const entries = await this.repo.getFoodLogForDate(userId, date);

    const totals: MacroTotals = entries.reduce(
      (acc, e) => ({
        calories: acc.calories + e.calories,
        protein: acc.protein + e.protein,
        carbs: acc.carbs + e.carbs,
        fat: acc.fat + e.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const byMealType: DailyNutritionSummary["byMealType"] = {
      breakfast: entries.filter((e) => e.mealType === "breakfast"),
      lunch: entries.filter((e) => e.mealType === "lunch"),
      dinner: entries.filter((e) => e.mealType === "dinner"),
      snack: entries.filter((e) => e.mealType === "snack"),
    };

    return { date, entries, totals, byMealType };
  }

  async deleteMealEntry(entryId: string): Promise<void> {
    return this.repo.deleteFoodLogEntry(entryId);
  }

  async getWeeklyMacroAverages(
    userId: string,
    endDate: Date = new Date()
  ): Promise<MacroTotals & { adherencePercent: number }> {
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const dailyTotals = await this.repo.getMacroTotalsForDateRange(
      userId,
      startDate,
      endDate
    );

    if (dailyTotals.length === 0) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, adherencePercent: 0 };
    }

    const avg = {
      calories: Math.round(
        dailyTotals.reduce((s, d) => s + d.totals.calories, 0) /
          dailyTotals.length
      ),
      protein: Math.round(
        dailyTotals.reduce((s, d) => s + d.totals.protein, 0) /
          dailyTotals.length
      ),
      carbs: Math.round(
        dailyTotals.reduce((s, d) => s + d.totals.carbs, 0) /
          dailyTotals.length
      ),
      fat: Math.round(
        dailyTotals.reduce((s, d) => s + d.totals.fat, 0) / dailyTotals.length
      ),
      adherencePercent: Math.round((dailyTotals.length / 7) * 100),
    };

    return avg;
  }

  async getEntriesForMealType(
    userId: string,
    date: Date,
    mealType: MealType
  ): Promise<FoodLogEntry[]> {
    const entries = await this.repo.getFoodLogForDate(userId, date);
    return entries.filter((e) => e.mealType === mealType);
  }
}
