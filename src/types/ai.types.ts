import { z } from "zod";

// ─── Chat ─────────────────────────────────────────────────────────────────────

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  createdAt: z.date(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// ─── Meal Suggestions ────────────────────────────────────────────────────────

export const MealSuggestionSchema = z.object({
  mealName: z.string(),
  description: z.string(),
  estimatedCalories: z.number(),
  estimatedProtein: z.number(),
  estimatedCarbs: z.number(),
  estimatedFat: z.number(),
  reasoning: z.string(),
});
export type MealSuggestion = z.infer<typeof MealSuggestionSchema>;

export const MealSuggestionsResponseSchema = z.object({
  suggestions: z.array(MealSuggestionSchema).length(3),
  generalAdvice: z.string(),
});
export type MealSuggestionsResponse = z.infer<typeof MealSuggestionsResponseSchema>;

// ─── Workout Plan ─────────────────────────────────────────────────────────────

export const WorkoutPlanExerciseSchema = z.object({
  exerciseName: z.string(),
  sets: z.number().int().min(1),
  repsOrDuration: z.string(),
  restSeconds: z.number().int().min(0),
  notes: z.string().optional(),
});

export const WorkoutPlanDaySchema = z.object({
  dayName: z.string(),
  focus: z.string(),
  exercises: z.array(WorkoutPlanExerciseSchema),
});

export const WorkoutPlanResponseSchema = z.object({
  planName: z.string(),
  description: z.string(),
  durationWeeks: z.number().int().min(1),
  daysPerWeek: z.number().int().min(1).max(7),
  days: z.array(WorkoutPlanDaySchema),
  generalTips: z.array(z.string()),
});
export type WorkoutPlanResponse = z.infer<typeof WorkoutPlanResponseSchema>;

// ─── Progress Insights ────────────────────────────────────────────────────────

export const ProgressInsightSchema = z.object({
  category: z.enum(["nutrition", "workout", "weight", "habits", "general"]),
  title: z.string(),
  insight: z.string(),
  recommendation: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

export const ProgressInsightsResponseSchema = z.object({
  summary: z.string(),
  insights: z.array(ProgressInsightSchema),
  weeklyGoal: z.string(),
});
export type ProgressInsightsResponse = z.infer<typeof ProgressInsightsResponseSchema>;
