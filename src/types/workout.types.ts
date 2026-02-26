import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const MuscleGroupSchema = z.enum([
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "core",
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "full_body",
  "cardio",
]);
export type MuscleGroup = z.infer<typeof MuscleGroupSchema>;

export const ExerciseCategorySchema = z.enum([
  "strength",
  "cardio",
  "flexibility",
  "balance",
  "sports",
]);
export type ExerciseCategory = z.infer<typeof ExerciseCategorySchema>;

// ─── Exercise (library item) ──────────────────────────────────────────────────

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ExerciseCategorySchema,
  primaryMuscles: z.array(MuscleGroupSchema),
  secondaryMuscles: z.array(MuscleGroupSchema).default([]),
  instructions: z.string().optional(),
  equipment: z.string().optional(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

// ─── Exercise Set ─────────────────────────────────────────────────────────────

export const ExerciseSetSchema = z.object({
  id: z.string(),
  exerciseId: z.string(),
  exerciseName: z.string(),
  setNumber: z.number().int().min(1),
  reps: z.number().int().min(0).optional(),
  weightKg: z.number().min(0).optional(),
  durationSeconds: z.number().int().min(0).optional(),
  distanceM: z.number().min(0).optional(),
  rpe: z.number().min(1).max(10).optional(),
  note: z.string().max(200).optional(),
  completedAt: z.date(),
});
export type ExerciseSet = z.infer<typeof ExerciseSetSchema>;

// ─── Workout Session ──────────────────────────────────────────────────────────

export const WorkoutSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().max(200).optional(),
  sets: z.array(ExerciseSetSchema),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  durationMinutes: z.number().int().min(0).optional(),
  note: z.string().max(1000).optional(),
});
export type WorkoutSession = z.infer<typeof WorkoutSessionSchema>;

export const CreateWorkoutSessionSchema = z.object({
  name: z.string().max(200).optional(),
  note: z.string().max(1000).optional(),
});
export type CreateWorkoutSessionInput = z.infer<typeof CreateWorkoutSessionSchema>;

export const LogExerciseSetSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  setNumber: z.coerce.number().int().min(1),
  reps: z.coerce.number().int().min(0).optional(),
  weightKg: z.coerce.number().min(0).optional(),
  durationSeconds: z.coerce.number().int().min(0).optional(),
  rpe: z.coerce.number().min(1).max(10).optional(),
  note: z.string().max(200).optional(),
});
export type LogExerciseSetInput = z.infer<typeof LogExerciseSetSchema>;
