import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const MealTypeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"]);
export type MealType = z.infer<typeof MealTypeSchema>;

// ─── Food Log Entry ───────────────────────────────────────────────────────────

export const FoodLogEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  foodName: z.string().min(1).max(200),
  brandName: z.string().max(100).optional(),
  servingSize: z.number().min(0).optional(),
  servingUnit: z.string().max(50).optional(),
  calories: z.number().min(0).max(10000),
  protein: z.number().min(0).max(1000),
  carbs: z.number().min(0).max(1000),
  fat: z.number().min(0).max(1000),
  fiber: z.number().min(0).max(200).optional(),
  sugar: z.number().min(0).max(500).optional(),
  mealType: MealTypeSchema,
  loggedAt: z.date(),
  note: z.string().max(500).optional(),
});
export type FoodLogEntry = z.infer<typeof FoodLogEntrySchema>;

export const LogMealSchema = z.object({
  foodName: z.string().min(1, "Food name is required").max(200),
  brandName: z.string().max(100).optional(),
  calories: z.number().min(0, "Must be 0 or more").max(10000),
  protein: z.number().min(0).max(1000),
  carbs: z.number().min(0).max(1000),
  fat: z.number().min(0).max(1000),
  mealType: MealTypeSchema,
  note: z.string().max(500).optional(),
});
export type LogMealInput = z.infer<typeof LogMealSchema>;

export const CreateFoodLogEntrySchema = LogMealSchema.extend({
  userId: z.string(),
});
export type CreateFoodLogEntryInput = z.infer<typeof CreateFoodLogEntrySchema>;

// ─── Macro Totals ─────────────────────────────────────────────────────────────

export const MacroTotalsSchema = z.object({
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
});
export type MacroTotals = z.infer<typeof MacroTotalsSchema>;

export const DailyNutritionSummarySchema = z.object({
  date: z.date(),
  entries: z.array(FoodLogEntrySchema),
  totals: MacroTotalsSchema,
  byMealType: z.record(MealTypeSchema, z.array(FoodLogEntrySchema)),
});
export type DailyNutritionSummary = z.infer<typeof DailyNutritionSummarySchema>;

// ─── Food Item (search / library) ────────────────────────────────────────────

export const FoodItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  brandName: z.string().optional(),
  caloriesPer100g: z.number(),
  proteinPer100g: z.number(),
  carbsPer100g: z.number(),
  fatPer100g: z.number(),
  defaultServingG: z.number().optional(),
});
export type FoodItem = z.infer<typeof FoodItemSchema>;
