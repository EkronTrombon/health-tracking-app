"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { workoutService } from "@/lib/di";
import { getCurrentUserId } from "@/lib/auth";
import { LogExerciseSetSchema } from "@/types/workout.types";
import type { ActionResult } from "./nutrition.actions";

/**
 * Create a new workout session and redirect to the active session page.
 * Uses native FormData for progressive enhancement (form action= compatible).
 */
export async function startWorkoutSessionAction(formData: FormData): Promise<never> {
  const name = (formData.get("name") as string | null)?.trim() || undefined;
  const userId = getCurrentUserId();

  const session = await workoutService.startSession(userId, { name });

  revalidatePath("/workouts");
  redirect(`/workouts/log?session=${session.id}`);
}

/**
 * Add one exercise set to an active session.
 * Re-validates with Zod (z.coerce) on the server.
 * Does NOT redirect — page refreshes via revalidatePath.
 */
export async function addExerciseSetAction(
  sessionId: string,
  data: unknown
): Promise<ActionResult> {
  const parsed = LogExerciseSetSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid set data: " + parsed.error.message };
  }

  try {
    await workoutService.addSet(sessionId, parsed.data);
    revalidatePath("/workouts/log");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to log set" };
  }
}

/**
 * Mark an active session as complete.
 * Uses session.startedAt from the DB to calculate duration accurately.
 */
export async function finishWorkoutSessionAction(sessionId: string): Promise<never> {
  const session = await workoutService.getWorkoutById(sessionId);

  if (!session) {
    redirect("/workouts");
  }

  await workoutService.finishSession(sessionId, session.startedAt);

  revalidatePath("/workouts");
  revalidatePath("/dashboard");
  redirect("/workouts");
}

/**
 * Delete a workout session from history.
 * Called from WorkoutHistoryList's useOptimistic delete handler.
 */
export async function deleteWorkoutSessionAction(
  sessionId: string
): Promise<ActionResult> {
  try {
    await workoutService.deleteWorkout(sessionId);
    revalidatePath("/workouts");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete workout" };
  }
}
