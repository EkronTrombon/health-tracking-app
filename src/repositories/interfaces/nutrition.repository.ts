import type {
  FoodLogEntry,
  CreateFoodLogEntryInput,
  MacroTotals,
} from "@/types/nutrition.types";

export interface DailyMacroTotal {
  date: Date;
  totals: MacroTotals;
  entryCount: number;
}

export interface IUpdateFoodLogEntry {
  foodName?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface INutritionRepository {
  getFoodLogForDate(userId: string, date: Date): Promise<FoodLogEntry[]>;
  getFoodLogForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<FoodLogEntry[]>;
  createFoodLogEntry(input: CreateFoodLogEntryInput): Promise<FoodLogEntry>;
  updateFoodLogEntry(
    id: string,
    input: IUpdateFoodLogEntry
  ): Promise<FoodLogEntry>;
  deleteFoodLogEntry(id: string): Promise<void>;
  getMacroTotalsForDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DailyMacroTotal[]>;
}
