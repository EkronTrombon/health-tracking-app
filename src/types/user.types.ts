import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const ActivityLevelSchema = z.enum([
  "sedentary",
  "lightly_active",
  "moderately_active",
  "very_active",
  "extremely_active",
]);
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>;

export const FitnessGoalSchema = z.enum([
  "lose_weight",
  "maintain_weight",
  "gain_muscle",
  "improve_endurance",
  "general_health",
]);
export type FitnessGoal = z.infer<typeof FitnessGoalSchema>;

export const GenderSchema = z.enum(["male", "female", "other", "prefer_not_to_say"]);
export type Gender = z.infer<typeof GenderSchema>;

// ─── Core Types ───────────────────────────────────────────────────────────────

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  age: z.number().int().min(13).max(120).optional(),
  gender: GenderSchema.optional(),
  heightCm: z.number().min(50).max(300).optional(),
  weightKg: z.number().min(10).max(500).optional(),
  activityLevel: ActivityLevelSchema.optional(),
  fitnessGoal: FitnessGoalSchema.optional(),
  dailyCalorieGoal: z.number().int().min(500).max(10000).optional(),
  proteinGoalGrams: z.number().min(0).max(500).optional(),
  dietaryRestrictions: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const UpdateProfileSchema = UserProfileSchema.omit({
  id: true,
  email: true,
  createdAt: true,
  updatedAt: true,
}).partial();
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

// ─── Weight Log ───────────────────────────────────────────────────────────────

export const WeightLogEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  weightKg: z.number().min(10).max(500),
  loggedAt: z.date(),
  note: z.string().max(500).optional(),
});
export type WeightLogEntry = z.infer<typeof WeightLogEntrySchema>;

export const CreateWeightLogEntrySchema = WeightLogEntrySchema.omit({
  id: true,
  userId: true,
  loggedAt: true,
});
export type CreateWeightLogEntryInput = z.infer<typeof CreateWeightLogEntrySchema>;
